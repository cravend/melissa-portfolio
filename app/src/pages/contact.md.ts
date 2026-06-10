import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../utils/markdownRoute";
import { buildContactMarkdown } from "../utils/markdownContent";
import { getContactPage } from "../utils/sanity";

export const prerender = true;

export const GET: APIRoute = createMarkdownHandler(async () => {
  const contactPage = await getContactPage();
  return buildContactMarkdown(contactPage);
});
