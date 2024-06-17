import {
  AppShellMain, Badge, Box, Button, Group, Image,
  Text
} from "@mantine/core";
import {Bid} from "@/db/schema";
import Link from "next/link";
import {getImageUrl} from "@/util/files";
import {BidCard} from "@/app/items/[itemId]/bidCard";
import {createBidAction} from "@/app/items/[itemId]/actions";
import {getBidsForItem} from "@/db/bids";
import {getItem} from "@/db/items";
import {auth} from "@/auth";
import {isAuctionOver} from "@/util/time";

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string },
}) {
  const item = await getItem(parseInt(itemId));
  const session = await auth();

  if (!item) {
    return (
      <AppShellMain className="space-y-8 flex flex-col items-center">
        <Image src="/images/noItemsListed.svg" width={200} height={200} alt="No items listed"/>
        <Text className="text-4xl font-bold">
          Item not found
          {/*  TODO: Use generic 404 page */}
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

  const bids = await getBidsForItem(parseInt(itemId));

  const hasBids = bids.length > 0;

  const isAuctionOverRes = isAuctionOver(item.endDate);

  const canPlaceBid =
    session &&
    item.userId !== session.user.id &&
    !isAuctionOverRes;

  return (
    <AppShellMain>
      <Group className="gap-8">
        <Box className="space-y-8">
          <Text className="text-4xl font-bold">
            {item.name}
          </Text>

          {isAuctionOverRes && (
            <Badge className="w-fit" variant="destructive">
              Bidding over
            </Badge>
          )}

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
          <Box className="flex justify-between">
            <Text className="text-2xl font-bold">
              Bids history
            </Text>
            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button type="submit">Place a bid</Button>
              </form>
            )}
          </Box>

          {hasBids ?
            bids.map((bid: Bid) => (
              <BidCard bid={bid} key={bid.id}/>
            ))
            : (
              <Box className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                <Image src="/images/noItemsListed.svg" width={200} height={200} alt="Package"/>
                <Text className="text-2xl font-bold">No bids yet</Text>
                {canPlaceBid && (
                  <form action={createBidAction.bind(null, item.id)}>
                    <Button type="submit">Place a bid</Button>
                  </form>
                )}
              </Box>
            )
          }
          </Box>
        </Group>
      </AppShellMain>
    );
  }
