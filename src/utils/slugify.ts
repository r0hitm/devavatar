import { slug } from "github-slugger";

export function slugify(str: string) {
    return slug(str);
}
