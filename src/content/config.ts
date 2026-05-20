import { z, defineCollection } from "astro:content";

const imageField = z.object({
    url: z.string(),
    alt: z.string(),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: imageField.optional(),
        worksImage1: imageField.optional(),
        worksImage2: imageField.optional(),
        platform: z.string(),
        stack: z.string(),
        website: z.string().optional(),
        github: z.string().optional(),
    }),
});

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        author: z.string(),
        authors: z.array(z.string()).optional(),
        authorPosition: z.string().optional(),
        date: z.string(),
        order: z.number().optional(),
        image: imageField,
        external_url: z.string().url().optional(),
        venue: z.string().optional(),
        summary: z.string().optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
    posts: postsCollection,
};
