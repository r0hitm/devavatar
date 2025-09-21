import { en } from "./en";
import { ja } from "./ja";

// TODO: Optimize it later, instead of returning everything
// a curried function to return the translation directly maybe
export function useTranslations(lang?: string) {
    if (lang === "ja") {
        return ja;
    } else {
        return en;
    }
}
