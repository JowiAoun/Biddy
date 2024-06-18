import {database} from "@/db/database";
import {eq} from "drizzle-orm";
import {itemSchema} from "@/db/schema";

export async function getItem(itemId: number) {
  return database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, itemId),
  })
}

export async function getItemDetailed(itemId: number) {
  return database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, itemId),
    with: {
      itemDetails: true
    },
  })
}

export async function getItemsByUser(userId: string) {
  return database.query.itemSchema.findMany({
    where: eq(itemSchema.userId, userId)
  });
}