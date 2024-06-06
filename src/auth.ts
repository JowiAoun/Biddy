import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {accountSchema, authenticatorSchema, sessionSchema, userSchema, verificationTokenSchema} from "@/db/schema"
import { database } from "@/db/database"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database, {
    usersTable: userSchema,
    accountsTable: accountSchema,
    sessionsTable: sessionSchema,
    verificationTokensTable: verificationTokenSchema,
    authenticatorsTable: authenticatorSchema,
  }),
  providers: [Google],
})