import type { BlogPostMetadata } from "./blog";

declare module "*.mdx" {
  export const metadata: BlogPostMetadata;

  const MDXComponent: () => React.JSX.Element;
  export default MDXComponent;
}
