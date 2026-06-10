import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildAuthorMarkdown } from "../utils/markdownContent";
import { portableTextToMarkdown } from "../utils/portableTextToMarkdown";
import { getAuthorPage, getBooks } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const [books, authorPage] = await Promise.all([getBooks(), getAuthorPage()]);
  const intro = portableTextToMarkdown(authorPage?.intro);
  return buildAuthorMarkdown(intro || undefined, books);
});
