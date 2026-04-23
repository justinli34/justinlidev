import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
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
    site: site ?? "https://justinli.dev",
  });
};
