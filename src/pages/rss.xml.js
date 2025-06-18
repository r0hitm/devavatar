import rss from "@astrojs/rss";
import { SITE } from "@/consts";
import getPosts from "@/utils/getPosts";

export async function GET(context) {
    const posts = await getPosts();
    return rss({
        title: SITE.title,
        description: SITE.description,
        site: context.site,
        items: posts.map(post => ({ ...post.data, link: `/posts/${post.id}/` }))
    });
}
