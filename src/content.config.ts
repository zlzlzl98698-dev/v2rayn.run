import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().default('/images/covers/default.svg'),
  author: z.string().default('v2rayn指南编辑部'),
  excerpt: z.string().optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).default([]),
  relatedSlugs: z.array(z.string()).default([]),
  pillar: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  canonical: z.string().optional(),
  sources: z.array(z.string()).default([]),
  brandRef: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: articleSchema,
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: articleSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: articleSchema,
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: articleSchema,
});

export const collections = {
  articles,
  reviews,
  guides,
  comparisons,
};
