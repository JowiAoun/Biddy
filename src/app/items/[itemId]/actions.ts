'use server';

import {auth} from "@/auth";
import {database} from "@/db/database";
import {bidSchema, itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {knockWorkflowTrigger} from "@/lib/knock";
import {isAuctionOver} from "@/util/time";
import {getItem} from "@/db/items";

export async function createBidAction(itemId: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const item = await getItem(itemId);

  if (!item) {
    throw new Error("Item not found")
  }

  if (isAuctionOver(item.endDate)) {
    throw new Error("Auction has ended")
  }

  const newBidAmount = item.highestBid + item.bidInterval

  await database.insert(bidSchema).values({
    amount: newBidAmount,
    itemId,
    userId: userId,
    timestamp: new Date(),
  });

  await database.update(itemSchema).set({
    highestBid: newBidAmount,
  })
    .where(eq(itemSchema.id, itemId));

  // Send notifications to everyone who has previously placed a bid
  const itemBids = await database.query.bidSchema.findMany({
    where: eq(bidSchema.itemId, itemId),
    with: {
      user: true,
    }
  })

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of itemBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient: any) => recipient.id === bid.userId)
      ) {
      recipients.push({
        id: bid.userId + "",
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      });
    }
  }

  if (recipients.length > 0) {
    // TODO: Create knock's own notification file abstraction for workflows
    await knockWorkflowTrigger({
      workflowKey: "biddy-user-placed-bid",
      session,
      recipients,
      data: {
        itemId,
        bidAmount: newBidAmount,
        itemName: item.name,
        image: item.imageMain,
      }
    })
  }

  revalidatePath(`/items/${itemId}`)
}