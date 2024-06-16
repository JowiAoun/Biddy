'use server';

import {auth} from "@/auth";
import {database} from "@/db/database";
import {bidSchema, itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {Knock} from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock(env.KNOCK_SECRET_API_KEY);

export async function createBidAction(itemId: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const item = await database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, itemId)
  });

  if (!item) {
    throw new Error("Item not found")
  }

  const newBidAmount = item.highestBid + item.bidInterval

  await database.insert(bidSchema).values({
    amount: newBidAmount,
    itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await database.update(itemSchema).set({
    highestBid: newBidAmount,
  })
    .where(eq(itemSchema.id, itemId));

  // Send notifications to everyone else who has previously placed a bid
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
  }[] = []

  for (const bid of itemBids) {
    if (
      bid.userId !== session.user.id &&
      recipients.find((recipient: any) => recipient.id === bid.userId)
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
    await knock.workflows.trigger("biddy-user-placed-bid", {
      actor: {
        id: userId,
        name: session.user.name ?? "Anonymous",
        email: session.user.email,
        collection: "users"
      },
      recipients,
      data: {
        itemId,
        bidAmount: newBidAmount,
        itemName: item.name,
      }
    });
  }

  revalidatePath(`/items/${itemId}`)
}