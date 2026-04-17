import type { BlogPostMetadata } from "./blogPostMetadata";

type BlogPostModule = {
  default: () => React.JSX.Element;
  metadata: BlogPostMetadata;
};

export type BlogPost = BlogPostMetadata & {
  Content: () => React.JSX.Element;
};

const blogPostModules = import.meta.glob<BlogPostModule>("./blog/*.mdx", {
  eager: true,
});

export const blogPosts: BlogPost[] = Object.values(blogPostModules)
  .map(({ default: Content, metadata }) => ({
    ...metadata,
    Content,
  }))
  .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
