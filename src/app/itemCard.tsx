import {Button, Card, CardSection, Group, Image, Text} from "@mantine/core";
import {getImageUrl} from "@/util/files";
import {Item} from "@/db/schema";
import Link from "next/link";
import { format } from "date-fns";
import {isAuctionOver} from "@/util/time";

export function ItemCard({item}: {item: Item}) {
  const isAuctionOverRes = isAuctionOver(item.endDate)

  return (
    <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection>
        <Image
          src={getImageUrl(item.imageMain)}
          width={200}
          height={200}
          alt={item.name}
        />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.name} - ${item.priceStart}</Text>
      </Group>

      {/*<Text size="sm" c="dimmed">*/}
      {/*  Sample description*/}
      {/*</Text>*/}

      {isAuctionOverRes ? (
        <Text size="sm" c="dimmed">
          Ends on: {format(item.endDate, "eeee m/dd/yyyy")}
        </Text>
      ) : (
        <Text size="sm" c="dimmed">
          Bidding is over
        </Text>
      )}

      <Link href={`/items/${item.id}`}>
        <Button fullWidth variant={isAuctionOverRes ? "outline" : "default"}>
          {isAuctionOverRes ? "View" : "Bid"}
        </Button>
      </Link>
    </Card>
  )
}