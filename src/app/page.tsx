import { database } from "@/db/database";
import { itemSchema } from "@/db/schema";
import {
  AppShell,
  AppShellMain,
  Button,
  TextInput,
  Text,
  Grid,
  Card,
  CardSection,
  Image,
  Group,
  GridCol
} from "@mantine/core";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";
import {Header} from "@/app/header";

export default async function HomePage() {
  const allItems = await database.query.itemSchema.findMany();

  return (
    <AppShellMain className="px-8 pt-24 space-y-8">
      <Text className="text-4xl font-bold">
        Items for Sale
      </Text>

      <Grid>
        {allItems.map((item: any) => (
          <GridCol key={item.id} span={3}>
            <Card
              key={item.id}
            >
              <CardSection>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
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
          </GridCol>
        ))}
      </Grid>
    </AppShellMain>
  );
}
