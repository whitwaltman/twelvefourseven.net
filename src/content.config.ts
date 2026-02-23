import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const college = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./college" }),
    schema: z.object({
        title: z.string(),
        course: z.number(),
    })
});

export const collections = { college };