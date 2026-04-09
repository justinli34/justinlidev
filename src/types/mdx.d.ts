declare module "*.mdx" {
  export const metadata: {
    slug: string;
    title: string;
    date: string;
    summary: string;
  };

  const MDXComponent: () => React.JSX.Element;
  export default MDXComponent;
}
