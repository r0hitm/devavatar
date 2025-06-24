import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/generateOgImages";

export const GET: APIRoute = async () =>
    new Response(await generateOgImage(), {
        headers: { "Content-Type": "image/png" }
    });
