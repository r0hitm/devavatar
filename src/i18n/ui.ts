export const LANG = {
    en: "English",
    ja: "日本語"
} as const;

type LangKeyType = keyof typeof LANG;

export const DEFAULT_LANG: LangKeyType = "en";

export const ui = {
    en: {
        "header.posts": "posts",
        "header.projects": "projects",
        "header.tags": "tags",
        "header.about": "about",
        "page.updated": "Updated: ",
        "page.draft": "DRAFT",
        "search.title": "Search",
        "search.input_placeholder": "how to do...",
        "search.found": " results found",
        "search.notfound": "No results found.",
        "search.before_search": "Search for anything...",
        "footer.support": "Buy me a coffee",
        "footer.report": "Report an issue",
        "footer.cookie": "No cookies, no ads, no tracking - just blog.",
        "nav.goback": "Go Back",
        "blog.share": "Share",
        "404.label": "Page Not Found",
        "404.gohome": "Go back home",
        "index.recentposts": "Recent Posts",
        "index.allposts": "All Posts",
        "index.recentprojects": "Recent Projects",
        "index.allprojects": "View More"
    },
    ja: {
        "header.posts": "記事",
        "header.projects": "プロジェクト",
        "header.tags": "タグ",
        "header.about": "自己紹介",
        "page.updated": "更新日： ",
        "page.draft": "下書き",
        "search.title": "検索",
        "search.input_placeholder": "入力してください",
        "search.found": "つ記事が見つけました",
        "search.notfound": "何も見つけませんでした",
        "search.before_search": "何でも検索",
        "footer.support": "コーヒーを買ってください",
        "footer.report": "バグ報告",
        "footer.cookie": "クッキーなし、広告なし、トラッキングなしーブログだけ",
        "nav.goback": "戻る",
        "blog.share": "共有",
        "404.label": "ページが存在しない",
        "404.gohome": "ホームページに戻る",
        "index.recentposts": "最近の記事",
        "index.allposts": "すべての記事",
        "index.recentprojects": "最近のプロジェクト",
        "index.allprojects": "詳細"
    }
} as const;
