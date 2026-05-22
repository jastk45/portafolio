import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: z.object({ src: image(), alt: z.string() }).optional(),
        worksImage1: z.object({ src: image(), alt: z.string() }).optional(),
        worksImage2: z.object({ src: image(), alt: z.string() }).optional(),
        platform: z.string(),
        stack: z.string(),
        website: z.string().optional(),
        github: z.string().optional(),
    }),
});

const postsCollection = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        author: z.string(),
        authors: z.array(z.string()).optional(),
        authorPosition: z.string().optional(),
        date: z.string(),
        order: z.number().optional(),
        image: z.object({ src: image(), alt: z.string() }),
        external_url: z.string().url().optional(),
        venue: z.string().optional(),
        summary: z.string().optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
    posts: postsCollection,
};
