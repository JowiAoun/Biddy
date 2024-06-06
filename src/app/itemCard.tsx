import {Button, Card, CardSection, GridCol, Group, Image, Text} from "@mantine/core";
import {getImageUrl} from "@/util/files";
import {Item} from "@/db/schema";

export function ItemCard({item}: {item: Item}) {
  return (
    <Card key={item.id}>
    <CardSection>
      <Image
        src={getImageUrl(item.fileKey)}
        height={160}
        alt={item.name}
      />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.name} - ${item.priceStart}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Sample description
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Sample button
      </Button>
    </Card>
  )
}