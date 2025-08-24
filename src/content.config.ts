import { SITE } from "@/consts";
import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            author: z.string().default(SITE.author),
            title: z.string(),
            description: z.string().max(150).min(50),
            pubDatetime: z.coerce.date(),
            modDatetime: z.coerce.date().optional().nullable(),
            draft: z.boolean().optional(),
            tags: z.array(z.string()).default(["others"]),
            ogImage: image()
                .refine(img => img.width >= 1200 && img.height >= 630, {
                    message:
                        "OpenGraph image must be at least 1200 X 630 pixels!"
                })
                .or(z.string())
                .optional(),
            canonicalURL: z.string().optional()
        })
});

const project = defineCollection({
    loader: file("src/content/data/projects.json"),
    schema: () =>
        z.object({
            id: z.string(),
            author: z.string().default(SITE.author),
            name: z.string(),
            description: z.string().default("Personal Project"),
            draft: z.boolean().optional(),
            tags: z.array(z.string()).default(["project"]),
            date: z.coerce.date(),
            url: z.string().default("#"),
            isLegacy: z.boolean().default(false)
        })
});

export const collections = { blog, project };
