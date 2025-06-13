type SiteType = {
    website: string;
    author: string;
    description: string;
    title: string;
    ogImage?: string;
    scheduledPostMargin: number;
};

export const SITE: SiteType = {
    website: 'https://devavatar.come',
    author: 'Rohit Mehta',
    description: 'My space on the wild-wild internet',
    title: 'Dev Avatar',
    scheduledPostMargin: 15 * 60 * 1000 // 15 minutes
} as const;

export const LOCALE = {
    lang: 'en',
    langTag: ['en-EN'] // BCP 47 langauge tag
} as const;
