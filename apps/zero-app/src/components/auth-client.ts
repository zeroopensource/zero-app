"use client";
// import { NEXTENV } from "@/lib/next-env";
import { useQuery } from "@tanstack/react-query";
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: NEXTENV.NEXT_PUBLIC_AUTH_API,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API,
  plugins: [multiSessionClient()],
});

export const { useSession: useAuthSession } = authClient;

export const useAuthDeviceSessions = () => {
  return useQuery({
    queryKey: ["auth-device-sessions"],
    queryFn: async () => {
      const { data, error } =
        await authClient.multiSession.listDeviceSessions();
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
