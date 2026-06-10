import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../../utils/markdownRoute";
import { buildKidsCornerToursIndexMarkdown } from "../../utils/markdownContent";
import { getKidsCornerPage, getPostsByCategory } from "../../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [tours, kidsCornerPage] = await Promise.all([
    getPostsByCategory("kids-corner/tours"),
    getKidsCornerPage(),
  ]);
  return buildKidsCornerToursIndexMarkdown(kidsCornerPage, tours);
});
