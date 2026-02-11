"use client";
import Link from "next/link";
import React from "react";

const links: {
  label: string;
  href: React.ComponentProps<typeof Link>["href"];
}[] = [
  { label: "Sign in", href: "/auth/signin" },
  { label: "Sign up", href: "/auth/signup" },
  { label: "Forgot Password", href: "/auth/forgot-password" },
];

export const AuthFormFooter = () => {
  return (
    <div className="flex justify-center gap-1 *:brightness-50">
      {links.map((link, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <span> / </span>}
          <Link className="hover:brightness-75" href={link.href}>
            {link.label}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
