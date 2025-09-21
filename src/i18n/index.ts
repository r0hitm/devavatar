import { en } from "./en";
import { ja } from "./ja";

export function useTranslations(lang: string | undefined) {
    if (lang === "ja") {
        return ja;
    } else {
        return en;
    }
}
