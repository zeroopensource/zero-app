import type { MDXComponents } from "mdx/types";

// import { cn } from "@/lib/utils";

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article className="prose dark:prose-invert prose-pre:overflow-x-auto">
      {children}
    </article>
  ),
  // h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
  //   <h1 className={cn("shadcn-h1", className)} {...props} />
  // ),
  // h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
  //   <h2 className={cn("shadcn-h2", className)} {...props} />
  // ),
  // h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
  //   <h3 className={cn("shadcn-h3", className)} {...props} />
  // ),
  // h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
  //   <h4 className={cn("shadcn-h4", className)} {...props} />
  // ),
  // p: ({ className, ...props }: React.ComponentProps<"p">) => (
  //   <p className={cn("shadcn-p", className)} {...props} />
  // ),
  // blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
  //   <blockquote className={cn("shadcn-blockquote", className)} {...props} />
  // ),
  // table: ({ className, ...props }: React.ComponentProps<"table">) => (
  //   <table className={cn("shadcn-blockquote", className)} {...props} />
  // ),
  // ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
  //   <ul className={cn("shadcn-ul", className)} {...props} />
  // ),
  // code: ({ className, ...props }: React.ComponentProps<"code">) => (
  //   <code className={cn("shadcn-code", className)} {...props} />
  // ),
  // small: ({ className, ...props }: React.ComponentProps<"small">) => (
  //   <small className={cn("shadcn-small", className)} {...props} />
  // ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
