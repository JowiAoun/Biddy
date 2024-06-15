'use server';

import {auth} from "@/auth";
import {database} from "@/db/database";
import {bidSchema, itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export async function createBidAction(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized")
  }

  const item = await database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, itemId)
  });

  if (!item) {
    throw new Error("Item not found")
  }

  const newBidValue = item.highestBid + item.bidInterval

  await database.insert(bidSchema).values({
    amount: newBidValue,
    itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await database.update(itemSchema).set({
    highestBid: newBidValue,
  })
    .where(eq(itemSchema.id, itemId));

  revalidatePath(`/items/${itemId}`)
}