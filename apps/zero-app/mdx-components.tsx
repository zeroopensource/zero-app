import type { MDXComponents } from "mdx/types";

// import { cn } from "@/lib/utils";

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article className="markdown-body pre:overflow-x-auto">{children}</article>
  ),
  // wrapper: ({ children }) => (
  //   <article className="prose dark:prose-invert prose-pre:overflow-x-auto">
  //     {children}
  //   </article>
  // ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
