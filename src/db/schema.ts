import {pgTable, serial} from "drizzle-orm/pg-core";

export const bidsSchema = pgTable("biddy_bids", {
  id: serial("id").primaryKey(),
})