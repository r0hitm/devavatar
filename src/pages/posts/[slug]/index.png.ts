import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/generateOgImages";
import getPosts from "@/utils/getPosts";

export async function getStaticPaths() {
    const posts = await getPosts().then(p =>
        p.filter(({ data }) => !data.draft && !data.ogImage)
    );

    return posts.map(post => ({
        params: { slug: post.id },
        props: { title: post.data.title, description: post.data.description }
    }));
}

export const GET: APIRoute = async ({ props }) =>
    new Response(await generateOgImage(props.title, props.description), {
        headers: { "Content-Type": "image/png" }
    });
