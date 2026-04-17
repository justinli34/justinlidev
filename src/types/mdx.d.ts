import type { BlogPostMetadata } from "../content/blogPostMetadata";

declare module "*.mdx" {
  export const metadata: BlogPostMetadata;

  const MDXComponent: () => React.JSX.Element;
  export default MDXComponent;
}
