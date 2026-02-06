"use client";

import { SignupVerificationForm } from "./signup-verfication-form";

export default function SignupVerificationPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupVerificationForm />
      </div>
    </div>
  );
}
