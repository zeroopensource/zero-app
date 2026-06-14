import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { ZeroCommunityComments } from "@/root/src/components/ui/zero-community-comments";

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article
      className={cn("markdown-body", "!text-zinc-300 !mx-auto max-w-3xl")}
    >
      {children}
      <ZeroCommunityComments />
    </article>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
