import { getCollection, type CollectionEntry } from "astro:content";

export default async function getPosts(): Promise<CollectionEntry<"blog">[]> {
    const isDev = import.meta.env.DEV;
    const posts = isDev
        ? await getCollection("blog")
        : await getCollection("blog", ({ data }) => !data.draft);

    return posts.sort(
        (a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf()
    );
}
