import {database} from "@/db/database";
import {desc, eq} from "drizzle-orm";
import {bidSchema} from "@/db/schema";

export async function getBidsForItem(itemId: number) {
  return database.query.bidSchema.findMany({
      where: eq(bidSchema.itemId, itemId),
      orderBy: desc(bidSchema.id),
      with: {
        user: {
          columns: {
            image: true,
            name: true,
          }
        }
      }
    }
  );
}