"use client";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-1 items-center justify-center md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
