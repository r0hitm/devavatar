// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
    site: "https://devavatar.com",
    prefetch: true,
    integrations: [
        mdx(),
        sitemap({
            serialize(sitemap_item) {
                // THIS IS FROM LEGACY DevAvatar
                const url = sitemap_item.url;
                const isRoot = /devavatar.com\/$/.test(url);
                const isAbout = /about\/$/.test(url);
                const isCredits = /credits\/$/.test(url);
                const postSlug =
                    url.match(/\/posts\/([^/]+)\/?$/)?.[1] ?? false;
                const isPost = postSlug && isNaN(Number(postSlug));

                if (isRoot || isAbout || isCredits || isPost) {
                    if (isPost) {
                        sitemap_item.priority = 1;
                    }
                    return sitemap_item;
                } else {
                    return undefined;
                }
            },
            changefreq: "weekly",
            lastmod: new Date(),
            priority: 0.8
        }),
        react()
    ],
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
    vite: { plugins: [tailwindcss()] }
});
