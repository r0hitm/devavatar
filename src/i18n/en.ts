/*
 * All the text that is used all over the site in English (default).
 */

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
        "para-1":
            "Ahoy! I'm Rohit, and this is my corner of the internet for all things tech and more! I write about software development, share project devlogs, and document my learning journey. You'll find posts about coding adventures, new technologies I'm exploring, and the occasional deep dive into interesting problems I've solved.",
        "para-2":
            "Outside of computers, I'm passionate about Japanese culture, anime, music, hitting the gym, and all things adorably cute. I'm always excited to share discoveries from these worlds too!",

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
