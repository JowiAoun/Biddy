import {
  AppShellMain,
  Button,
  TextInput,
  Text, NumberInput,
} from "@mantine/core";
import {createItemAction} from "@/app/items/create/actions";

export default async function ItemCreatePage() {

  return (
    <AppShellMain className="px-8 pt-24 space-y-8">
      <Text className="text-4xl font-bold">
        Post an item to the Auction
      </Text>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        action={createItemAction}
      >
        <TextInput required name="name" placeholder="Name your item" />
        <NumberInput required name="priceStart" decimalScale={2} min={1} placeholder="Starting price" rightSection={<Text>Sample Currency</Text>} fixedDecimalScale />

        <Button className="self-end" type="submit">Post item</Button>
      </form>
    </AppShellMain>
  );
}
