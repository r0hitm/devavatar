---
title: "Add Internationalization (i18n) to an Astro.js Project"
description: "A no-BS guide to implementing simple, route-based i18n for two languages in Astro.js, with English as the default and Japanese as the second locale."
draft: true
tags:
    - devlog
    - i18n
    - tutorial
    - web
pubDatetime: 2025-09-25T19:02:00.000Z
---

As you may know, I also speak Japanese, and for a long time, I've wanted to localize my site. This became especially important to me because writing blog posts in English was breaking my Japanese immersion. I've spent the last few weeks working on this, especially since my Japanese skills and my familiarity with Astro.js have both improved. I couldn't find an up-to-date tutorial online for the latest version of Astro that wasn't overkill for my simple needs. I only need to support one additional locale (Japanese), and the official documentation felt a bit dry. This post documents my simple, no-BS, route-based localization strategy for two languages, with English as the default. I've designed it to be extensible, so you could potentially add more than two languages (more on that later).

**P.S.**: Use this post as a reference alongside the official [Astro i18n guide](https://docs.astro.build/en/guides/internationalization/).

## Table of contents

## Configure Astro

We need to make two crucial changes to our `astro.config.mjs`:

1.  Add the `i18n` key to define our locales, fallback, and routing strategy.
2.  Configure the sitemap for the locales so that it generates i18n routes.

```js
// astro.config.mjs
export default defineConfig({
    // ...
    i18n: {
        locales: ["en", "ja"], // List of languages
        defaultLocale: "en",
        fallback: {
            ja: "en" // fallback to the English version if a Japanese page doesn't exist
        },
        routing: {
            prefixDefaultLocale: false,
            fallbackType: "rewrite" // on fallback, rewrite the URL to show the fallback page instead of redirecting
        }
    },
    integrations: [
        // ...,
        sitemap({
            i18n: {
                defaultLocale: "en",
                locales: {
                    en: "en", // default must also be here
                    ja: "ja-JP" // must match above
                }
            }
        })
        // ...
    ]
    //...
});
```

This configuration will result in the following URL structure:

- default (English): `devavatar.com/`
- localized (Japanese): `devavatar.com/ja/`

## Localize Site Text and Element Labels

I didn't want to rewrite my site's pages for each language, especially when most of the layout and code is identical with only minor text changes. Let's create three files in our source directory:

- `i18n/en.ts`: This file will hold the default English text for UI elements and paragraphs on your non-blog pages. I went through all my pages to create this file. I also use this file's TypeScript type to ensure that translations for other locales (in my case, just Japanese) are consistent.

```ts
// i18n/en.ts
export const en = {
    // common stuff like header text, button labels etc.
    header: {
        posts: "posts",
        projects: "projects",
        tags: "tags",
        about: "about"
    },
    card: {
        updated: "Updated: ",
        draft: "DRAFT"
    },
    search: {
        main: "Search",
        input_box_placeholder: "how to do...",
        found: " results found.",
        notfound: "No results found.",
        before: "Search for anything..."
    },
    footer: {
        support: "Buy me a coffee",
        report: "Report an issue",
        "no-cookie": "No cookies, no ads, no tracking - just blog."
    },
    bloglayout: {
        goback: "Go back",
        updated: "Updated: ",
        share: "Share"
    },
    pagelayout: {
        updated: "Updated: "
    },

    // 404 page
    PAGE404: {
        notfound: "Page Not Found",
        goback: "Go back home"
    },

    // Home page (/)
    INDEX: {
        heading: "Ahoy!!",
        "para-1": "[A Paragraph]"
        "para-2": "[Another Paragraph]",
        recentposts: "Recent Posts",
        allposts: "All Posts",

        recentprojects: "Recent Projects",
        viewmore: "View More"
    },

    // page /projects
    PROJECTS: {
        heading: "Projects",
        p: "Here are some of my personal projects I've worked on. You can find more on my "
    }
};

export type Translations = typeof en;
```

- `i18n/ja.ts`: Same as the file above, but contains translations in Japanese.
- `i18n/index.ts`: This file imports the two files above and returns the correct translations object based on the current locale.

```ts
// i18n/index.ts
import { en } from "./en";
import { ja } from "./ja";

export function useTranslations(lang: string | undefined) {
    if (lang === "ja") {
        return ja;
    } else {
        return en;
    }
}
```

Now, replace the hardcoded text in your pages and layouts using `Astro.currentLocale` and the `useTranslations()` helper.

```ts
// ...
const currentLang = Astro.currentLocale;
const localized = useTranslations(currentLang);

// now you can use the localized labels as {localized.header.posts} for example in your HTML.
```

## Fix Links

Since this is a route-based localization, we need to fix our internal links. Right now, they probably point to the English version of the site. We will use [`getRelativeLocaleUrl`](https://docs.astro.build/en/reference/modules/astro-i18n/#getrelativelocaleurl) for this.

It's very simple. Just replace all your `href` values with this:

```jsx
<a href={getRelativeLocaleUrl(currentLang ?? "en", url)}> link </a>

// currentLang = Astro.currentLocale
// and fallbacks to using "en" if it's undefined
// url is your any valid path on-site.
```

### Be careful of trailing `/`

I use the pathname to underline the currently active nav links in my site header. However, this wasn't working for localized `/ja/` paths. It turned out that the return value from `getRelativeLocaleUrl()` has a trailing `/`, which was messing up my logic. This took me a lot longer to figure out than I'd like to admit. Here is the final working snippet for my case:

```ts
const pathname = Astro.url.pathname;
const subpath = pathname.match(/[^\/]+/g);
const navpath = subpath && subpath[subpath.length - 1];
const isActive =
    href === pathname ||
    href === "/" + (navpath || "") ||
    href === "/ja/" + (navpath || "") + "/"; // The localized URLs were ending with a `/` - I suppose this is a quirk of Astro's getRelativeLocaleUrl.
```

## SEO changes

We have already configured our sitemap in the Astro config. There are three more things we need to do for better SEO.

1.  Update the canonical URL in our root layout to point to our default locale.
2.  Add an alternate `hreflang` meta tag for the other locales.
3.  Add the `lang` attribute to our `<html>` tag.

The code is self-explanatory:

```ts
// NOTE: This code assumes you are not using any language prefix for the default locale,
//       as configured in astro.config.mjs above.
const currentLocale = Astro.currentLocale;
const pathname = Astro.url.pathname.replace(
    new RegExp(`^/${currentLocale}`),
    ""
);
const canonicalURL = new URL(pathname, Astro.site);
const alternateJaURL = new URL(`/ja${pathname}`, Astro.site);
```

```html
<html lang="{currentLocale}">
    <head>
        <!-- ... -->
        <link rel="canonical" href="{canonicalURL}" />
        <link rel="alternate" hreflang="ja" href="{alternateJaURL}" />
        <!-- Add more alternate links if you are using more than 2 locales -->
        <!-- ... -->
    </head>
    <!-- ... -->
</html>
```

## Add Language Selector UI

This part is subjective, depending on how you want to design your button and where you want to place it. I defined a constant in my site configuration for each locale I'm using to have a mapping for the UI label.

```ts
// consts.ts
export const LANG = {
    en: "English",
    ja: "日本語"
} as const;
```

I can import this in my switcher component to map over each locale. This is one way I kept the design of my approach extensible to more locales. You can abstract it further by defining a separate `locales` constant and using it in your Astro config instead of hardcoding the values. I didn't do that because I only need Japanese localization for now.

```tsx
// Logic for switching the language. This is also somewhat designed for extension.
const handleLangChange = (newLang: keyof typeof LANG) => {
    setIsOpen(false);
    const currentPath = window.location.pathname;
    const currentLang = props.lang;

    if (newLang === currentLang) {
        return;
    }

    const langPrefix = currentLang === "en" ? "" : `/${currentLang}`;
    const basePath = currentPath.startsWith(langPrefix)
        ? currentPath.substring(langPrefix.length)
        : currentPath;

    const newPath = newLang === "en" ? basePath : `/${newLang}${basePath}`;

    window.location.pathname = newPath || "/";
};
```

The component's design and placement are left as an exercise for the reader. Common placements are in the header or the footer of the site.

## Creating Localized Blogs

This is the part that I semi-hate because it requires creating a localized directory and keeping the filename of each blog post the same. This means creating two blog posts—one default and one localized. This will result in N files for N locales. The situation here differs if you are using a CMS or generating pages on demand (SSR).

[See here for more details](https://docs.astro.build/en/guides/internationalization/#create-localized-folders).

## Conclusion

That's it! Your site has i18n now. If you found this helpful, please let me know by joining the Discord! You can switch to Japanese on this blog post from the header. Try it out now!

![silent voice baka handsign](https://media1.tenor.com/m/9hpTx40GEKsAAAAC/baka-idiot.gif)
