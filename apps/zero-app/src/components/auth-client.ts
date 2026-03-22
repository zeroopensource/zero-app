"use client";
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// import { NEXTENV } from "@/lib/next-env";

export const authClient = createAuthClient({
  // baseURL: NEXTENV.NEXT_PUBLIC_AUTH_API,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API,
  plugins: [multiSessionClient()],
});

export const { useSession: useAuthSession } = authClient;
