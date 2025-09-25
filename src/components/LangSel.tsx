import { Languages } from "lucide-react";
import { LANG } from "@/consts";
import { useState } from "react";

type LangSelProps = {
    lang: string;
    langList: (keyof typeof LANG)[];
    showLabel?: boolean;
};

export default function LangSel(props: LangSelProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLangChange = (newLang: keyof typeof LANG) => {
        setIsOpen(false);
        const currentPath = window.location.pathname;
        const currentLang = props.lang;

        // Don't navigate if the language is already the selected one
        if (newLang === currentLang) {
            return;
        }

        const langPrefix = currentLang === "en" ? "" : `/${currentLang}`;
        const basePath = currentPath.startsWith(langPrefix)
            ? currentPath.substring(langPrefix.length)
            : currentPath;

        const newPath = newLang === "en" ? basePath : `/${newLang}${basePath}`;

        // Ensure the root path is handled correctly
        window.location.pathname = newPath || "/";
    };

    return (
        <div className="relative">
            <button
                aria-label="language selector"
                className="hover:text-d-accent text-d-txt-base inline-flex cursor-pointer items-center p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Languages className="inline-block size-4" />
                {props.showLabel && (
                    <span className="ml-2 inline-block">
                        {LANG[props.lang as "en" | "ja"]}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="bg-d-fill shadow-d-border/50 absolute top-full right-0 z-10 mt-2 rounded-md shadow-sm">
                    <ul className="py-1">
                        {props.langList.map(lang => (
                            <li key={lang}>
                                <button
                                    onClick={() => handleLangChange(lang)}
                                    className="text-d-txt-base hover:bg-d-card-muted/30 block w-full cursor-pointer px-4 py-2 text-left text-sm"
                                >
                                    {LANG[lang]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
