import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import favoriteAlbums from '../collections/favoriteAlbums';

const albumSchema = z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string(),
    release: z.number().int().positive().min(1900).max(2026),
    length: z.number().int().positive(),
    notes: z.string().optional(),
});

type Album = z.infer<typeof albumSchema>;

const albums = defineCollection({
    loader: async () => {
        return favoriteAlbums.map(({ id, ...rest }: Album) => ({
            id: id,
            ...rest
        }));
    },
    schema: albumSchema
});

const garden = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./garden" }),
    schema: z.object({
        title: z.string(),
        type: z.enum(["note", "essay", "collection"]),
        stage: z.enum(["seedling", "budding", "evergreen"]).optional(),
        planted: z.coerce.date(),
        watered: z.coerce.date().optional(),
    })
});

export const collections = { albums, garden };