import { database } from "@/db/database";
import { bidsSchema } from "@/db/schema";
import {Button, NumberInput} from "@mantine/core";
import {revalidatePath} from "next/cache";

export default async function HomePage() {

  const bids = await database.query.bidsSchema.findMany();

  return (
    <main className="container mx-auto py-12">
      <form action={async (formData: FormData) => {
        "use server";
        // const bid = formData.get("bid") as string;
        await database.insert(bidsSchema).values({})
        revalidatePath("/");
      }}>
        <NumberInput name="bid" prefix="$" min={1} placeholder="Enter your bid" />
        <Button type="submit">Place Bid</Button>
      </form>

      {bids.map((bid: any) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
