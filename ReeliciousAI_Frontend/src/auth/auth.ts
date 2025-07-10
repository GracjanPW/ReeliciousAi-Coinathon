import { getConnection } from "@/db/client";
import { MssqlAdapter } from "@/db/mssqlAdapter";
import NextAuth from "next-auth";
import { authConfig } from "./config";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth(async () => {
  const client = await getConnection();
  if (!client) {
    throw new Error("Failed to connect to the database");
  }
  return {
    ...authConfig,
    session: {
      strategy: "database",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      updateAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    events: {
      linkAccount: async ({ user, account }) => {
        const adapterUser = user as AdapterUser;
        console.log("Account linked:", user, account);
        if (!adapterUser?.emailVerified) {
          client
            .request()
            .input("Id", user.id)
            .input("Name", user.name)
            .input("Email", user.email)
            .input("EmailVerified", new Date())
            .input("Image", user.image)
            .execute("con_UpdateUser");

          console.log("User email verified:", user.id);
        }
      },
    },
    callbacks: {},
    cookies:{
      sessionToken: {
        options: {
          domain: process.env.NODE_ENV == "production" ? "reeliciousai.com" : undefined
        }
      }
    },
    pages: {
      signIn: "/auth/sign-in",
      signOut: "/auth/sign-out",
      error: "/auth/error",
      verifyRequest: "/auth/verify-request",
    },
    adapter: MssqlAdapter(client),
  };
});
