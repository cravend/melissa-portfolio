import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildHomeMarkdown } from "../utils/markdownContent";
import { getFeaturedPosts, getSiteSettings } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [siteSettings, featuredPosts] = await Promise.all([
    getSiteSettings(),
    getFeaturedPosts(),
  ]);
  return buildHomeMarkdown(siteSettings, featuredPosts);
});
