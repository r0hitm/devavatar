import { SITE } from "@/consts";

export default (
    title: string = SITE.title,
    description: string = SITE.description,
    website: string = SITE.website
) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // 背景色: --color-warm-night-800 -> #2a211e
            backgroundColor: "#2a211e",
            fontFamily: '"IBM Plex Sans", sans-serif'
        }}
    >
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "1100px", // 1200pxの画像幅に合わせた内側のサイズ
                height: "530px", // 630pxの画像高さに合わせた内側のサイズ
                // カード背景: --color-warm-night-700 -> #3a2d28
                backgroundColor: "#3a2d28",
                // ボーダー: --color-apricot-500 -> #f97316
                border: "2px solid #f97316",
                borderRadius: "16px",
                padding: "20px"
            }}
        >
            {/* ヘッダー */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    // アクセントカラー: --color-apricot-400 -> #ff9a58
                    color: "#ff9a58",
                    fontSize: "32px"
                }}
            >
                <span style={{ fontWeight: 700 }}>&lt; Dev Avatar /&gt;</span>
            </div>

            {/* メインコンテンツ */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}
            >
                <p
                    style={{
                        // メインテキスト: --color-apricot-50 -> #fff6ee
                        color: "#fff6ee",
                        fontSize: "68px",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        display: "-webkit-box",
                        lineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {title}
                </p>
                <p
                    style={{
                        // 説明テキスト: --color-apricot-200 -> #ffd5b1
                        color: "#ffd5b1",
                        fontSize: "36px",
                        lineHeight: 1.3,
                        marginTop: "16px",
                        letterSpacing: "-0.01em",
                        display: "-webkit-box",
                        lineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {description}
                </p>
            </div>

            {/* フッター */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    // 説明テキストと同じ色を使用
                    color: "#ffd5b1",
                    fontSize: "28px"
                }}
            >
                <span>{website.substring(8)}</span>
            </div>
        </div>
    </div>
);
