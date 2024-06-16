import {
  AppShellMain,
  Text,
  Grid,
  GridCol
} from "@mantine/core";
import {ItemCard} from "@/app/itemCard";
import {Item} from "@/db/schema";
import {auth} from "@/auth";
import {EmptyState} from "@/app/auctions/emptyState";
import {getItemsByUser} from "@/db/items";

export default async function MyAuctionPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const allItems = await getItemsByUser(session.user.id)

  const hasItems = allItems.length > 0;

  return (
    <AppShellMain className="space-y-8">
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
