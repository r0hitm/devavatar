import { ui, DEFAULT_LANG } from "./ui";

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return DEFAULT_LANG;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof DEFAULT_LANG]) {
        return ui[lang][key] || ui[DEFAULT_LANG][key];
    };
}
