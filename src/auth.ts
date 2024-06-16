import NextAuth, {DefaultSession} from "next-auth"
import Google from "@auth/core/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {accountSchema, sessionSchema, userSchema, verificationTokenSchema} from "@/db/schema"
import { database } from "@/db/database"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database, {
    usersTable: userSchema,
    accountsTable: accountSchema,
    sessionsTable: sessionSchema,
    verificationTokensTable: verificationTokenSchema,
  }),
  callbacks: {
    session({ session, user}) {
      session.user.id = user.id;
      return session;
    }
  },
  providers: [Google],
})