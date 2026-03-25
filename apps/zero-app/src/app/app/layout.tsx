"use client";
import { useAuthSession } from "@/components/auth-client";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: authSession } = useAuthSession();
  const {
    session,
    // user
  } = authSession || {};

  return session && children;
}
