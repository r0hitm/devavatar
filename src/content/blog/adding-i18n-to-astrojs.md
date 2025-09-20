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
