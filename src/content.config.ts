import { defineCollection } from 'astro:content';
// glob loader creates entries from dirs, file loader creates multiple entries from a single file
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const garden = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./garden" }),
    schema: z.object({
        title: z.string(),
        type: z.string(),
        stage: z.string(),
        planted: z.coerce.date(),
        watered: z.coerce.date().optional(),
    })
});

export const collections = { garden };