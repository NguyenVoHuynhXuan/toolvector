import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const vsToolSchema = z.object({
  name: z.string(),
  badge: z.string().optional(),
  score: z.string().optional(),
  price: z.string().optional(),
  bestFor: z.string().optional(),
  link: z.string().optional(),
});

const rankedToolSchema = z.object({
  rank: z.number(),
  name: z.string(),
  badge: z.string().optional(),
  score: z.string().optional(),
  price: z.string().optional(),
  bestFor: z.string().optional(),
  link: z.string().optional(),
});

const commonSchema = ({ image }: { image: any }) =>
  z.object({
    logo: image().optional(),
    thumbnail: image().optional(),
    banner: image().optional(),
    date: z.string().optional(),
    name: z.string().optional(),
    promo: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    foodType: z.string().optional(),
    serviceType: z.string().optional(),
    articleType: z.enum(['review', 'compare', 'top-list']).optional(),
    link: z.string().optional(),
    metaDescription: z.string().optional(),
    features: z.array(z.string()).optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    reviewsCount: z.number().optional(),
    rating: z.number().optional(),
    startingPrice: z.string().optional(),
    freeTrial: z.string().optional(),
    delivery: z.string().optional(),
    founded: z.number().optional(),
    origin: z.string().optional(),
    verdictBadge: z.string().optional(),
    winnerSummary: z.string().optional(),
    vsTools: z.array(vsToolSchema).optional(),
    rankedTools: z.array(rankedToolSchema).optional(),
  });

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: commonSchema,
});

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: commonSchema,
});

const compareCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/compare' }),
  schema: commonSchema,
});

const top5Collection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/top5' }),
  schema: commonSchema,
});

const dealsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/deals' }),
  schema: commonSchema,
});

export const collections = {
  blog: blogCollection,
  reviews: reviewsCollection,
  compare: compareCollection,
  top5: top5Collection,
  deals: dealsCollection,
};
