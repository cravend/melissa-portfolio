import type { APIRoute } from "astro";
import { buildLlmsTxt } from "../utils/markdownIndex";
import { getPosts } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  return new Response(buildLlmsTxt(posts), { status: 200 });
};
