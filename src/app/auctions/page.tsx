import { database } from "@/db/database";
import {
  AppShellMain,
  Text,
  Grid,
  GridCol
} from "@mantine/core";
import {ItemCard} from "@/app/itemCard";
import {Item, itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {auth} from "@/auth";
import {EmptyState} from "@/app/auctions/emptyState";

export default async function MyAuctionPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const allItems = await database.query.itemSchema.findMany({
    where: eq(itemSchema.userId, session.user.id)
  });

  const hasItems = allItems.length > 0;

  return (
    <AppShellMain className="px-8 pt-24 space-y-8">
      <Text className="text-4xl font-bold">
        Your ongoing Auctions
      </Text>

      {hasItems ?
        <Grid>
          {allItems.map((item: Item) => (
            <GridCol span={3} key={item.id}>
              <ItemCard item={item} key={item.id}/>
            </GridCol>
          ))}
        </Grid>
        : <EmptyState/>
      }

    </AppShellMain>
  );
}
