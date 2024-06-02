import {pgTable, serial} from "drizzle-orm/pg-core";

export const bids = pgTable("biddy_bids", {
  id: serial("id").primaryKey(),
})