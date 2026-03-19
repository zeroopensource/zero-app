"use client";
import Terms from "./terms-and-conditions.mdx";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 overflow-auto p-4">
      <Terms />
    </div>
  );
}
