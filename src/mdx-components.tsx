import type { MDXComponents } from "mdx/types";

import { createMDXComponents } from "@/components/mdx";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return createMDXComponents(components);
}
