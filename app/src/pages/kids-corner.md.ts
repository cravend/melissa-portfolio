import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildKidsCornerMarkdown } from "../utils/markdownContent";
import {
  getKidsCornerPage,
  getPostsByCategory,
  orderPostsWithFeaturedFirst,
} from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [rawPolls, rawTours, kidsCornerPage] = await Promise.all([
    getPostsByCategory("kids-corner/polls"),
    getPostsByCategory("kids-corner/tours"),
    getKidsCornerPage(),
  ]);
  return buildKidsCornerMarkdown(
    kidsCornerPage,
    orderPostsWithFeaturedFirst(rawPolls),
    orderPostsWithFeaturedFirst(rawTours)
  );
});
