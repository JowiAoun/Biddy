"use client";

import {
  AppShellMain,
  Button,
  TextInput,
  Text, NumberInput, FileInput,
} from "@mantine/core";
import {createItemAction, createUploadUrlAction} from "@/app/items/create/actions";

export default function ItemCreatePage() {
  return (
    <AppShellMain className="space-y-8">
      <Text className="text-4xl font-bold">
        Post an item to the Auction
      </Text>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
          });

          const name = formData.get("name") as string;
          const priceStart = parseFloat(formData.get("priceStart") as string);
          const bidInterval = parseFloat(formData.get("bidInterval") as string);

          await createItemAction({
            name,
            priceStart,
            bidInterval,
            fileName: file.name,
          })
        }}
      >
        <FileInput name="file" placeholder="Upload images"/>
        <TextInput required name="name" placeholder="Name your item" />
        <NumberInput required name="priceStart" decimalScale={2} min={1} placeholder="Starting price" rightSection={<Text>$</Text>} fixedDecimalScale />
        <NumberInput required name="bidInterval" decimalScale={2} min={1} placeholder="Bid interval" rightSection={<Text>$</Text>} fixedDecimalScale />

        <Button className="self-end" type="submit">Post item</Button>
      </form>
    </AppShellMain>
  );
}
