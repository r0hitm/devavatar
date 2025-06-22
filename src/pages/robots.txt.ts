import type { APIRoute } from "astro";

// See: https://github.com/ai-robots-txt/ai.robots.txt/
const blockedBots = [
    "AI2Bot",
    "Ai2Bot-Dolma",
    "aiHitBot",
    "Amazonbot",
    "Andibot",
    "anthropic-ai",
    "Applebot",
    "Applebot-Extended",
    "bedrockbot",
    "Brightbot 1.0",
    "Bytespider",
    "CCBot",
    "ChatGPT-User",
    "Claude-SearchBot",
    "Claude-User",
    "Claude-Web",
    "ClaudeBot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "Cotoyogi",
    "Crawlspace",
    "Diffbot",
    "DuckAssistBot",
    "EchoboxBot",
    "FacebookBot",
    "facebookexternalhit",
    "Factset_spyderbot",
    "FirecrawlAgent",
    "FriendlyCrawler",
    "Google-CloudVertexBot",
    "Google-Extended",
    "GoogleOther",
    "GoogleOther-Image",
    "GoogleOther-Video",
    "GPTBot",
    "iaskspider/2.0",
    "ICC-Crawler",
    "ImagesiftBot",
    "img2dataset",
    "ISSCyberRiskCrawler",
    "Kangaroo Bot",
    "meta-externalagent",
    "Meta-ExternalAgent",
    "meta-externalfetcher",
    "Meta-ExternalFetcher",
    "MistralAI-User/1.0",
    "MyCentralAIScraperBot",
    "NovaAct",
    "OAI-SearchBot",
    "omgili",
    "omgilibot",
    "Operator",
    "PanguBot",
    "Panscient",
    "panscient.com",
    "Perplexity-User",
    "PerplexityBot",
    "PetalBot",
    "PhindBot",
    "Poseidon Research Crawler",
    "QualifiedBot",
    "QuillBot",
    "quillbot.com",
    "SBIntuitionsBot",
    "Scrapy",
    "SemrushBot",
    "SemrushBot-BA",
    "SemrushBot-CT",
    "SemrushBot-OCOB",
    "SemrushBot-SI",
    "SemrushBot-SWA",
    "Sidetrade indexer bot",
    "TikTokSpider",
    "Timpibot",
    "VelenPublicWebCrawler",
    "Webzio-Extended",
    "wpbot",
    "YandexAdditional",
    "YandexAdditionalBot",
    "YouBot"
];

const blockedUserAgents = blockedBots
    .map(bot => `User-agent: ${bot}`)
    .join("\n");

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

${blockedUserAgents}
Disallow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
    if (!site) {
        return new Response("Sitemap URL not found in Astro config.", {
            status: 500
        });
    }
    const sitemapURL = new URL("sitemap-index.xml", site);
    return new Response(getRobotsTxt(sitemapURL));
};
