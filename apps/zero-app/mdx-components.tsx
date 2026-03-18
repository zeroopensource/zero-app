import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

const components: MDXComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1 className={cn("shadcn-h1", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <h1 className={cn("shadcn-h2", className)} {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
