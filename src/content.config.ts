import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string(),
    title: z.string(),
  }),
});

export const collections = { blog };
