import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildTravelIndexMarkdown } from "../utils/markdownContent";
import { portableTextToMarkdown } from "../utils/portableTextToMarkdown";
import { getPostsByCategory, getTravelPage } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [posts, travelPage] = await Promise.all([
    getPostsByCategory("travel"),
    getTravelPage(),
  ]);
  const intro = portableTextToMarkdown(travelPage?.intro);
  return buildTravelIndexMarkdown(intro || undefined, posts);
});
