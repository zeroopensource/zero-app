import type { MDXComponents } from "mdx/types";

// import { cn } from "@/lib/utils";

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article className="markdown-body">{children}</article>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
