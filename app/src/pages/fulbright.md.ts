import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildFulbrightIndexMarkdown } from "../utils/markdownContent";
import {
  getFulbrightPage,
  getPostsByCategory,
  getResources,
} from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [posts, resources, fulbrightPage] = await Promise.all([
    getPostsByCategory("fulbright"),
    getResources(),
    getFulbrightPage(),
  ]);
  return buildFulbrightIndexMarkdown(fulbrightPage, posts, resources);
});
