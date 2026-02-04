"use client";
import { createAuthClient } from "better-auth/react";
// import { NEXTENV } from "@/lib/next-env";

export const authClient = createAuthClient({
  // baseURL: NEXTENV.NEXT_PUBLIC_ZERO_SERVICE_GATEWAY,
  baseURL: process.env.NEXT_PUBLIC_ZERO_SERVICE_GATEWAY,
});

export const { useSession: useAuthSession } = authClient;
