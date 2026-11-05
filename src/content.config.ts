import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commonSchema = ({ image }: { image: any }) => z.object({
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
    link: z.string().optional(),
    metaDescription: z.string().optional(),
    features: z.array(z.string()).optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    reviewsCount: z.number().optional(),
    startingPrice: z.string().optional(),
    delivery: z.string().optional(),
    founded: z.number().optional(),
    origin: z.string().optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: commonSchema,
});

const reviewsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/reviews" }),
  schema: commonSchema,
});

const compareCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/compare" }),
  schema: commonSchema,
});

const dealsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/deals" }),
  schema: commonSchema,
});

export const collections = {
  'blog': blogCollection,
  'reviews': reviewsCollection,
  'compare': compareCollection,
  'deals': dealsCollection,
};
// Content layer collections reloaded: saily-review added
