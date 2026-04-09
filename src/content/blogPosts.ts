import HelloWorldPost, { metadata as helloWorldMetadata } from "./blog/hello-world.mdx";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  Content: () => React.JSX.Element;
};

export const blogPosts: BlogPost[] = [
  {
    ...helloWorldMetadata,
    Content: HelloWorldPost,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
