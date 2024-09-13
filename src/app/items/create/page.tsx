"use client";

import {AppShellMain, Button, FileInput, NumberInput, Select, Text, TextInput,} from "@mantine/core";
import '@mantine/dates/styles.css';
import {createItemAction, createUploadUrlAction} from "@/app/items/create/actions";
import {DatesProvider, DateTimePicker} from "@mantine/dates";
import {useState} from "react";
import {getNextDaySameTimeRoundedToHour} from "@/util/time";
import {ItemConditionEnum} from "@/util/enums";
import {getNumericEnumIndex} from "@/util/item";

const itemConditionArray = Object.keys(ItemConditionEnum).filter(key => isNaN(Number(key)));

export default function ItemCreatePage() {
  const [endDate, setEndDate] = useState<Date>(getNextDaySameTimeRoundedToHour());
  const [condition, setCondition] = useState<string | null>();

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
          const condition = getNumericEnumIndex(ItemConditionEnum, formData.get("condition") as string)

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

          if (!condition) {
            return;
          }

          await createItemAction({
            name,
            priceStart,
            bidInterval,
            imageMain: file.name,
            condition,
            endDate,
          })
        }}
      >
        <FileInput name="file" placeholder="Upload images"/>
        <TextInput required name="name" placeholder="Name your item" />
        <Select placeholder="Select item quality" data={itemConditionArray} allowDeselect={false} value={condition} onChange={setCondition}/>
        <NumberInput required name="priceStart" decimalScale={2} min={1} placeholder="Starting price" rightSection={<Text>$</Text>} fixedDecimalScale />
        <NumberInput required name="bidInterval" decimalScale={2} min={1} placeholder="Bid interval" rightSection={<Text>$</Text>} fixedDecimalScale />
        <DatesProvider settings={{ consistentWeeks: true }}>
          <DateTimePicker
            required
            valueFormat="DD MMMM YYYY hh:mm A"
            placeholder="Auction end date & time"
            value={endDate}
            onDateChange={setEndDate}
          />
        {/*  TODO: Set minDate and maxDate*/}
        </DatesProvider>

        <Button className="self-end" type="submit">Post item</Button>
      </form>
    </AppShellMain>
  );
}
