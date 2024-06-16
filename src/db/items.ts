import {database} from "@/db/database";
import {eq} from "drizzle-orm";
import {itemSchema} from "@/db/schema";

export async function getItem(itemId: number) {
  return database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, itemId),
  })
}