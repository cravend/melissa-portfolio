import type { APIRoute } from "astro";
import { buildSitemapMd } from "../utils/markdownIndex";
import { getPosts } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  return new Response(buildSitemapMd(posts), { status: 200 });
};
