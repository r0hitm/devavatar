import { expect, test } from "@playwright/test";

test.describe("Interal Links", () => {
    test("should not have broken internal links on homepage", async ({
        page
    }) => {
        await page.goto("http://localhost:3000");

        const links = page.locator("a");
        const allLinkHrefs = await links
            .all()
            .then(linkLocators =>
                Promise.all(linkLocators.map(link => link.getAttribute("href")))
            );

        const uniqueLinks = new Set(
            allLinkHrefs.filter(
                (href): href is string => href !== null && href.startsWith("/")
                // !href.startsWith("#") &&
                // !href.startsWith("mailto:") &&
                // !href.startsWith("tel:") &&
            )
        );
        const absoluteUrls = Array.from(uniqueLinks).map(
            href => new URL(href, page.url()).href
        );

        for (const url of absoluteUrls) {
            const response = await page.request.head(url, {
                failOnStatusCode: false
            });

            expect
                .soft(response.status(), `Broken link: ${url}`)
                .toBeLessThan(400);
        }
    });

    // test("should not have broken internal links across all pages", async ({
    //     page
    // }) => {
    //     const baseUrl = "http://localhost:3000";
    //     const visited = new Set<string>();
    //     const toVisit = new Set<string>([baseUrl]);
    //     const brokenLinks: { url: string; status: number; foundOn: string }[] =
    //         [];

    //     while (toVisit.size > 0) {
    //         const currentUrl = toVisit.values().next().value as string;
    //         toVisit.delete(currentUrl);

    //         if (visited.has(currentUrl)) continue;
    //         visited.add(currentUrl);

    //         try {
    //             const response = await page.goto(currentUrl, {
    //                 waitUntil: "domcontentloaded"
    //             });

    //             if (response && response.status() >= 400) {
    //                 brokenLinks.push({
    //                     url: currentUrl,
    //                     status: response.status(),
    //                     foundOn: currentUrl
    //                 });
    //                 continue;
    //             }

    //             const links = page.locator("a");
    //             const allLinkHrefs = await links
    //                 .all()
    //                 .then(linkLocators =>
    //                     Promise.all(
    //                         linkLocators.map(link => link.getAttribute("href"))
    //                     )
    //                 );

    //             for (const href of allLinkHrefs) {
    //                 if (
    //                     !href ||
    //                     !href.startsWith("/") ||
    //                     href.startsWith("#")
    //                     // href.startsWith("mailto:") ||
    //                     // href.startsWith("tel:") ||
    //                 ) {
    //                     continue;
    //                 }

    //                 const absoluteUrl = new URL(href, currentUrl).href;

    //                 if (
    //                     !visited.has(absoluteUrl) &&
    //                     !toVisit.has(absoluteUrl)
    //                 ) {
    //                     // Check if the link is valid before adding to visit queue
    //                     const linkResponse = await page.request.head(
    //                         absoluteUrl,
    //                         {
    //                             failOnStatusCode: false
    //                         }
    //                     );

    //                     if (linkResponse.status() >= 400) {
    //                         brokenLinks.push({
    //                             url: absoluteUrl,
    //                             status: linkResponse.status(),
    //                             foundOn: currentUrl
    //                         });
    //                     } else {
    //                         toVisit.add(absoluteUrl);
    //                     }
    //                 }
    //             }
    //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         } catch (error) {
    //             brokenLinks.push({
    //                 url: currentUrl,
    //                 status: 0,
    //                 foundOn: currentUrl
    //             });
    //         }
    //     }

    //     for (const broken of brokenLinks) {
    //         expect
    //             .soft(
    //                 broken.status,
    //                 `Broken link: ${broken.url} (found on ${broken.foundOn})`
    //             )
    //             .toBeLessThan(400);
    //     }

    //     expect(
    //         brokenLinks.length,
    //         `Found ${brokenLinks.length} broken links`
    //     ).toBe(0);
    // });
});
