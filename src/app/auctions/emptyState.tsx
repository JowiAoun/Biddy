import {Box, Button, Image, Text} from "@mantine/core";
import Link from "next/link";

export function EmptyState() {
  return (
    <Box className="space-y-8 flex flex-col items-center">
      <Image src="/images/noItemsListed.svg" width={200} height={200} alt="No items listed"/>
      <Text className="text-2xl font-bold">You have no auctions yet.</Text>
      <Button>
        <Link href="/items/create">Create Auction</Link>
      </Button>
    </Box>
  )
}