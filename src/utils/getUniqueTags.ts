import { slugify } from "./slugify";
import type { CollectionEntry } from "astro:content";
// import postFilter from "./postFilter";

interface Tag {
    tag: string;
    tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
    const tags: Tag[] = posts
        // .filter(postFilter)
        .flatMap(post => post.data.tags)
        .map(tag => ({ tag: slugify(tag), tagName: tag }))
        .filter(
            (value, index, self) =>
                self.findIndex(tag => tag.tag === value.tag) === index
        )
        .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
    return tags;
};

export default getUniqueTags;
