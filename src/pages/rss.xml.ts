import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection("blog")).sort(
    (left, right) => right.data.date.getTime() - left.data.date.getTime(),
  );

  return rss({
    title: "Justin Li",
    description: "Writing about software, AI, decentralized systems, and music.",
    items: posts.map((post) => ({
      description: post.data.description,
      link: `/blog/${post.id}`,
      pubDate: post.data.date,
      title: post.data.title,
    })),
    site: context.site ?? "https://justinli.dev",
  });
}
