import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./notes" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
    })
});

export const collections = { notes };