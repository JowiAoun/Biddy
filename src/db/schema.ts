import {integer, pgTable, primaryKey, real, serial, text, timestamp} from "drizzle-orm/pg-core";
import {AdapterAccountType} from "@auth/core/adapters";
import {relations, sql} from "drizzle-orm";

export const accountSchema = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => userSchema.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessionSchema = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokenSchema = pgTable("verificationToken", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  }, (verificationToken) => ({compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),})
)

export const itemSchema = pgTable("item", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  condition: integer("condition").notNull(),
  priceStart: real("priceStart").notNull(),
  highestBid: real("highestBid").notNull(),
  bidInterval: real("bidInterval").notNull(),
  numBids: integer("numBids").notNull().default(0),
  startDate: timestamp("startDate", {mode: "date"}).notNull().default(new Date()),
  endDate: timestamp("endDate", {mode: "date"}).notNull(),
  imageMain: text("fileKey").notNull(),
  tags: text("tags").array(10).notNull().default(sql`ARRAY[]::text[]`),
})

export const itemDetailsSchema = pgTable("itemDetails", {
  itemId: integer("itemId").notNull().references(() => itemSchema.id, { onDelete: "cascade" }),
  description: text("description"),
  images: text("images").array(10).notNull().default(sql`ARRAY[]::text[]`),
})

export const bidSchema = pgTable("bid", {
  id: serial("id").primaryKey(),
  amount: real("amount").notNull(),
  itemId: serial("itemId")
    .notNull()
    .references(() => itemSchema.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp", { mode: "date"}).notNull(),
})

export const userSchema = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const userRelations = relations(bidSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [bidSchema.userId],
    references: [userSchema.id],
  })
}))

export type Item = typeof itemSchema.$inferSelect;
export type Bid = typeof bidSchema.$inferSelect;