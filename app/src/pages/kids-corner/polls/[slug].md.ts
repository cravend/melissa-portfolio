import type { APIRoute } from "astro";
import { createMarkdownHandler } from "../../../utils/markdownRoute";
import { buildPostMarkdown } from "../../../utils/markdownContent";
import { getPostsByCategory, type Post } from "../../../utils/sanity";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getPostsByCategory("kids-corner/polls");
  return posts.map((post) => ({
    params: { slug: post.slug.current },
    props: { post },
  }));
}

export const GET: APIRoute = createMarkdownHandler(({ props }) => {
  const { post } = props as { post: Post };
  return buildPostMarkdown(post, `/kids-corner/polls/${post.slug.current}`);
});
