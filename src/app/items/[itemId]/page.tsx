import {
  AppShellMain, Box, Button, Group, Image,
  Text, Container
} from "@mantine/core";
import {database} from "@/db/database";
import {itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import Link from "next/link";
import {getImageUrl} from "@/util/files";
import {formatTimestampDistance} from "@/util/format";
import {BidCard} from "@/app/items/[itemId]/bidCard";

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string },
}) {
  const item = await database.query.itemSchema.findFirst({
    where: eq(itemSchema.id, parseInt(itemId)),
  })

  if (!item) {
    return (
      <AppShellMain className="space-y-8 flex flex-col items-center">
        <Image src="/noItemsListed.svg" width={200} height={200} alt="No items listed"/>
        <Text className="text-4xl font-bold">
          Item not found
          {/*  TODO: Use a generic 404 page */}
        </Text>

        <Text className="text-l">
          The item you&apos;re trying to view is invalid.<br/>
          Please try again.
        </Text>

        <Button>
          <Link href={`/auctions`}>Back to Listings</Link>
        </Button>
      </AppShellMain>
    );
  }

  const bids = [
    {
      id: 1,
      amount: 100,
      username: "Alice",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 200,
      username: "Bob",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 300,
      username: "Charlie",
      timestamp: new Date(),
    }
  ];

  const hasBids = bids.length > 0;

  return (
    <AppShellMain>
      <Group className="gap-8">
        <Box className="space-y-8">
          <Text className="text-4xl font-bold">
            {item.name}
          </Text>

          <Image
            className="rounded-xl"
            src={getImageUrl(item.fileKey)}
            width={200}
            height={200}
            alt={item.name}
          />

          <Box className="space-y-4">
            <Text className="text-xl font-bold">
              Starting price: ${item.priceStart}
            </Text>
            <Box>
              <Text>Bid interval: ${item.bidInterval}</Text>
            </Box>
          </Box>
        </Box>

        <Box className="space-y-4 flex-1">
          <Text className="text-2xl font-bold">
            Bids history
          </Text>

          {hasBids ?
            bids.map((bid) => (
              <BidCard bid={bid} key={bid.id}/>
            ))
          : <Text>
              No bids yet
              <Image src="/noItemsListed.svg" width={200} height={200} alt="No items listed"/>
            </Text>
          }
        </Box>
      </Group>
    </AppShellMain>
  );
}
