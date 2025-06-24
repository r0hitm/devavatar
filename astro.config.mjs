// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import rehypeExternalLinks from "rehype-external-links";
import { SITE } from "./src/consts";

// https://astro.build/config
export default defineConfig({
    site: SITE.website,
    prefetch: true,
    integrations: [mdx(), sitemap(), react()],
    markdown: {
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: true
        },
        remarkPlugins: [[remarkToc, { heading: "Table of contents" }]],
        rehypePlugins: [
            [
                rehypeExternalLinks,
                { rel: ["nofollow", "noopener", "noreferrer"] }
            ]
        ]
    },
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"]
        },
        plugins: [tailwindcss()]
    }
});
