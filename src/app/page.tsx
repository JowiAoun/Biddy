import { database } from "@/db/database";
import {
  AppShellMain,
  Text,
  Grid,
  GridCol
} from "@mantine/core";
import {ItemCard} from "@/app/itemCard";
import {Item} from "@/db/schema";

export default async function HomePage() {
  const allItems = await database.query.itemSchema.findMany();

  return (
    <AppShellMain className="px-8 pt-24 space-y-8">
      <Text className="text-4xl font-bold">
        Items for Sale
      </Text>

      <Grid>
          {allItems.map((item: Item) => (
            <GridCol span={3} key={item.id}>
              <ItemCard item={item} key={item.id}/>
            </GridCol>
          ))}
      </Grid>
    </AppShellMain>
  );
}
