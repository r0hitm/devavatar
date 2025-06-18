import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBtn(window.scrollY / window.innerHeight > 0.3);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showBtn && (
                <div className={`fixed right-0 bottom-6 z-10 sm:bottom-8`}>
                    <button
                        className="border-d-border bg-d-fill w-10 cursor-pointer rounded-l-full border-t border-b border-l p-1"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        aria-label="Scroll to Top"
                        title="Scroll to Top"
                    >
                        <ChevronUp className="text-d-txt-base size-6" />
                    </button>
                </div>
            )}
        </>
    );
}
