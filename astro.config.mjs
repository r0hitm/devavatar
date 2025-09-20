// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import rehypeExternalLinks from "rehype-external-links";
import { SITE } from "./src/consts";

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
    site: isProd ? SITE.website : "http://localhost:4321",
    i18n: {
        locales: ["en", "ja"],
        defaultLocale: "en",
        fallback: {
            ja: "en"
        },
        routing: {
            prefixDefaultLocale: false,
            fallbackType: "rewrite" // TODO: later add not-translated warning to those pages
        }
    },
    prefetch: true,
    integrations: [
        mdx(),
        sitemap({
            i18n: {
                defaultLocale: "en",
                locales: {
                    en: "en",
                    ja: "ja"
                }
            }
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
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"]
        },
        plugins: [tailwindcss()]
    }
});
