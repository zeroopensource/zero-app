import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article
      className={cn("markdown-body", "!text-zinc-300 !mx-auto max-w-3xl")}
    >
      {children}
    </article>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
