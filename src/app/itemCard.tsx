import {Button, Card, CardSection, Group, Image, Text} from "@mantine/core";
import {getImageUrl} from "@/util/files";
import {Item} from "@/db/schema";
import Link from "next/link";

export function ItemCard({item}: {item: Item}) {
  return (
    <Card key={item.id}>
    <CardSection>
      <Image
        src={getImageUrl(item.fileKey)}
        width={200}
        height={200}
        alt={item.name}
      />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.name} - ${item.priceStart}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Sample description
      </Text>

      <Button>
        <Link href={`/items/${item.id}`}>Bid</Link>
      </Button>
    </Card>
  )
}