import {
  AppShellMain, Button, Image,
  Text,
} from "@mantine/core";
import {database} from "@/db/database";
import {itemSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import Link from "next/link";
import {getImageUrl} from "@/util/files";

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

  return (
    <AppShellMain>
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

      <Text className="text-xl font-bold">
        Starting price: ${item.priceStart}
      </Text>
    </AppShellMain>
  );
}
