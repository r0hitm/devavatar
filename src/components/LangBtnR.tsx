import "@/styles/flag.css";

import { useEffect, useRef, useState } from "react";

import { LOCALES } from "@/consts";
import { Languages } from "lucide-react";

interface Props {
    currentLocale: "en" | "ja";
    currentPath: string;
}

export default function LangBtnR({ currentLocale, currentPath }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 現在のパスから言語プレフィックスを除去してベースパスを取得
    function getPathWithoutLocale(path: string): string {
        for (const locale of Object.keys(LOCALES)) {
            if (path.startsWith(`/${locale}/`)) {
                return path.slice(`/${locale}`.length);
            }
            if (path === `/${locale}`) {
                return "/";
            }
        }
        return path;
    }

    const basePath = getPathWithoutLocale(currentPath);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="lang-switcher relative inline-block" ref={dropdownRef}>
            <button
                className="hover:text-d-accent inline-block cursor-pointer px-2"
                title="Select language"
                aria-label="select-language"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}>
                <Languages className="inline-block size-4" />
                <span className="text-xs">{LOCALES[currentLocale].label}</span>
            </button>

            {isOpen && (
                <ul
                    className="lang-dropdown bg-d-fill border-d-border/20 absolute right-0 z-50 mt-1 min-w-fit rounded border shadow-lg"
                    role="menu">
                    {Object.entries(LOCALES).map(([locale, { label }]) => (
                        <li role="menuitem" key={locale}>
                            <a
                                href={
                                    locale === "ja"
                                        ? basePath || "/"
                                        : `/${locale}${basePath}`
                                }
                                className={`hover:bg-d-accent/20 inline-flex w-full items-center gap-0.5 px-2 py-1 text-sm ${
                                    locale === currentLocale
                                        ? "text-d-accent font-bold"
                                        : ""
                                }`}
                                onClick={() => setIsOpen(false)}>
                                <span
                                    className={`fi fi-${locale === "en" ? "gb" : "jp"}`}
                                />
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
