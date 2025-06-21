import type socialIcons from "@/assets/socialIcons";

type SiteType = {
    website: string;
    author: string;
    description: string;
    title: string;
    ogImage?: string;
    scheduledPostMargin: number;
};

export const SITE: SiteType = {
    website: "https://devavatar.come",
    author: "Rohit Mehta",
    description: "My space on the wild-wild internet",
    title: "Dev Avatar",
    scheduledPostMargin: 15 * 60 * 1000 // 15 minutes
} as const;

export const LOCALE = {
    lang: "en",
    langTag: ["en-EN"] // BCP 47 langauge tag
} as const;

export type SocialObjects = {
    name: keyof typeof socialIcons;
    href: string;
    active: boolean;
    linkTitle: string;
}[];

export const SOCIALS: SocialObjects = [
    {
        name: "Github",
        href: "https://github.com/r0hitm",
        linkTitle: `My GitHub profile`,
        active: true
    },
    {
        name: "Facebook",
        href: "#",
        linkTitle: `#`,
        active: false
    },
    {
        name: "Instagram",
        href: "#",
        linkTitle: `#`,
        active: false
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/r0hitm",
        linkTitle: `Connect with me on LinkedIn`,
        active: true
    },
    {
        name: "Mail",
        href: "mailto:rohitm09@proton.me",
        linkTitle: `Email`,
        active: true
    },
    {
        name: "X",
        href: "https://x.com/_r0hitm",
        linkTitle: `X (Twitter)`,
        active: false
    },
    {
        name: "Twitch",
        href: "#",
        linkTitle: `${SITE.title} on Twitch`,
        active: false
    },
    {
        name: "YouTube",
        href: "#",
        linkTitle: `${SITE.title} on YouTube`,
        active: false
    },
    {
        name: "WhatsApp",
        href: "#",
        linkTitle: `${SITE.title} on WhatsApp`,
        active: false
    },
    {
        name: "Pinterest",
        href: "#",
        linkTitle: `${SITE.title} on Pinterest`,
        active: false
    },
    {
        name: "CodePen",
        href: "#",
        linkTitle: `${SITE.title} on CodePen`,
        active: false
    },
    {
        name: "Discord",
        href: "https://discord.gg/H92KUTAFds",
        linkTitle: `Join the official discord server`,
        active: true
    },
    {
        name: "GitLab",
        href: "#",
        linkTitle: `${SITE.title} on GitLab`,
        active: false
    },
    {
        name: "Reddit",
        href: "#",
        linkTitle: `${SITE.title} on Reddit`,
        active: false
    },
    {
        name: "Steam",
        href: "#",
        linkTitle: `${SITE.title} on Steam`,
        active: false
    },
    {
        name: "Telegram",
        href: "https://t.me/avatar_hiro",
        linkTitle: `Send me text on Telegram`,
        active: false
    },
    {
        name: "Mastodon",
        href: "https://mastodon.social/@_r0hitm",
        linkTitle: `Follow me on Mastodon`,
        active: false
    },
    {
        name: "Bluesky",
        href: "https://bsky.app/profile/devavatar.com",
        linkTitle: `Follow me on Bluesky`,
        active: true
    }
];
