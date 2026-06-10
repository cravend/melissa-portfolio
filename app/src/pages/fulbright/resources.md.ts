import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../../utils/markdownRoute";
import { buildFulbrightResourcesMarkdown } from "../../utils/markdownContent";
import { getFulbrightPage, getResources } from "../../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [resources, fulbrightPage] = await Promise.all([
    getResources(),
    getFulbrightPage(),
  ]);
  return buildFulbrightResourcesMarkdown(fulbrightPage, resources);
});
