import { en, type Translations } from "./en";

/*
 * All the text that is used all over the site in Japanese.
 * This file only contains translations for Japanese and falls back to English
 * if a translation is not available.
 */

export const ja: Translations = {
    // common stuff like header text, button labels etc.
    header: {
        posts: "投稿",
        projects: "プロジェクト",
        tags: "タグ",
        about: "プロフィール"
    },
    card: {
        updated: "更新日: ",
        draft: "下書き"
    },
    search: {
        main: "検索",
        notfound: "何も見つけませんでした",
        input_box_placeholder: "入力してください",
        before: "何でも検索…",
        found: "つ記事が見つけました"
    },
    footer: {
        support: "コーヒーを買ってください",
        report: "バグ報告",
        "no-cookie": "クッキーなし、広告なし、トラッキングなしーブログだけ"
    },
    bloglayout: {
        goback: "戻る",
        updated: "更新日: ",
        share: "共有"
    },
    pagelayout: {
        updated: "更新日: "
    },

    // 404 page
    PAGE404: {
        notfound: "ページが存在しない",
        goback: "ホームに戻る"
    },
    // Home page (/)
    INDEX: {
        heading: en.INDEX.heading,
        "para-1":
            "Ahoy! ロヒットと申します。インタネット上で僕のところへようこそ！ここは個人プロジェクトでブロック、技術、ソフトウェア開発など、\
            または学ぶことを記事で投稿していおります。プログラミング冒険から個人面白くトラブル解決とかも見つけますよ。",
        "para-2":
            "コンピュター以外は、僕は日本文化、アニメ、音楽、運動と可愛いものが大好きです。新しい人と出会うのが好きなのでぜひ\
        フッターのSNSリンクで連絡を待っております。",

        recentposts: "最新投稿",
        allposts: "すべての投稿",

        recentprojects: "最新プロジェクト",
        viewmore: "詳細"
    },
    // page /projects
    PROJECTS: {
        heading: "プロジェクト",
        p: "以下は私の個人的なプロジェクトです。他は私のGitHubでご覧ください。"
    }
} as const;
