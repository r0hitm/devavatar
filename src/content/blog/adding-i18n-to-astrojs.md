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
                    ja: "ja-JP" // must match above
                }
            }
        }),
// ...
```

default (english): `devavatar.com/`
localized (japanese): `devavatar.com/ja/`
