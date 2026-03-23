"use client";
// import { NEXTENV } from "@/lib/next-env";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  // baseURL: NEXTENV.NEXT_PUBLIC_AUTH_API,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API,
  plugins: [multiSessionClient()],
});

export type AuthSession = typeof authClient.$Infer.Session;

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

export const useAuthSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      if (error) {
        throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["auth-device-sessions"] });
      return data;
    },
  });
};

export const useAuthSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut();
      if (error) {
        toast.error(error.message);
        throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["auth-device-sessions"] });
      return data;
    },
  });
};

export const useAuthRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: { sessionToken: string }) => {
      const { data, error } = await authClient.multiSession.revoke({
        sessionToken: value.sessionToken,
      });
      if (error) {
        throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["auth-device-sessions"] });
      return data;
    },
  });
};

export const useAuthSetActiveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: { sessionToken: string }) => {
      const { data, error } = await authClient.multiSession.setActive({
        sessionToken: value.sessionToken,
      });
      if (error) {
        throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["auth-device-sessions"] });
      return data;
    },
  });
};
