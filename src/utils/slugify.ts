import { slug } from "github-slugger";

export function slugify(str: string) {
    return slug(str);
}

export function slugifyAll(arr: string[]) {
    return arr.map(str => slugify(str));
}
