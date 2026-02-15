import { LOCALE, LOCALES, SITE } from "./src/consts";

// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const locales = Object.keys(LOCALES);
const defaultLocale = LOCALE.lang;

// https://astro.build/config
export default defineConfig({
    site: SITE.website,
    i18n: {
        locales,
        defaultLocale
    },
    prefetch: true,
    integrations: [
        mdx(),
        sitemap({
            i18n: {
                locales: {
                    ja: "ja-JP",
                    en: "en-US"
                },
                defaultLocale
            }
        }),
        react()
    ],
    markdown: {
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: true
        },
        remarkPlugins: [
            [remarkToc, { heading: "(Table[ -]of[ -])?contents?|toc|目次" }]
        ],
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
