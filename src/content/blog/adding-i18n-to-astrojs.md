---
title: Adding i18n to astrojs
description: pplaceholderplaceholderplaceholderplaceholderlaceholder
draft: true
tags:
    - devlog
pubDatetime: 2025-09-20T19:02:00.000Z
---

Intro

## Table of contents

## enable i18n in astro config

setup locales w/ default local of english and no locale prefix for english, and `ja-JP` route prefix for japanese locales.

```js
// ...
    i18n: {
        locales: ["en", "ja-JP"],
        defaultLocale: "en",
        fallback: {
            "ja-JP": "en"
        },
        routing: {
            prefixDefaultLocale: false,
            fallbackType: "rewrite"
        }
    },
// ...
```

configure sitemap() so that it generates i18n routes in the post-build site:

```js
// ...

        sitemap({
            i18n: {
                defaultLocale: "en",
                locales: {
                    en: "en-US", // default must also be here
                    ja: "ja-JP" // must match above
                }
            }
        }),
// ...
```

default (english): `devavatar.com/`
localized (japanese): `devavatar.com/ja/`

## setting up UI

I have a global config folder where I defined this for my UI use later:

```ts
export const languages = {
    en: "English",
    ja: "日本語"
} as const;
```

Let's setup lang attribute on our root layout using `Astro.currentLocale`.
I setup this on my root layout html lang attribute, and input to format date.

## creating locales text mapping

It turns out I really don't want to rewrite my site pages again in different langauge when most of the layout/code is same w/ minimal text changes.

~~SO, I am creating `/src/i18n/locales-map.ts` that export keys for each language that maps to localized texts. using layout files as template for all locales via this approach.~~

create `i18n/en.ts`, `i18n/ja.ts` and `i18n/index.ts` w/ two objects, using en's to typecheck ja's against for consistency. with a helper function in index.ts

add those to the pages/layouts.
