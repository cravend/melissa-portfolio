import { PAGE_META } from "./seo";
import { getPostPath } from "./routes";
import type { Post, PostCategory } from "./sanity";

const STATIC_PAGES: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/travel", label: "Travel" },
  { path: "/fulbright", label: "Fulbright" },
  { path: "/fulbright/resources", label: "Fulbright Resources" },
  { path: "/kids-corner", label: "Kids' Corner" },
  { path: "/kids-corner/tours", label: "Kids' Corner Tours" },
  { path: "/author", label: "Author" },
  { path: "/contact", label: "Contact" },
];

function postMarkdownPath(post: Post): string {
  return `${getPostPath(post.slug.current, post.category)}.md`;
}

export function buildLlmsTxt(posts: Post[]): string {
  const byCategory = (category: PostCategory) =>
    posts.filter((post) => post.category === category);

  const lines = [
    "# Melissa Craven",
    "",
    "> Fulbright educator, travel writer, and storyteller.",
    "",
    "## Site",
    "",
    ...STATIC_PAGES.map(
      (page) => `- [${page.label}](${page.path === "/" ? "/index.md" : `${page.path}.md`})`
    ),
    "",
    "## Travel",
    "",
    ...(byCategory("travel").length
      ? byCategory("travel").map(
          (post) => `- [${post.title ?? "---"}](${postMarkdownPath(post)})`
        )
      : ["- No travel posts yet."]),
    "",
    "## Fulbright",
    "",
    ...(byCategory("fulbright").length
      ? byCategory("fulbright").map(
          (post) => `- [${post.title ?? "---"}](${postMarkdownPath(post)})`
        )
      : ["- No vignettes yet."]),
    "",
    "## Kids' Corner",
    "",
    "### Tours",
    "",
    ...(byCategory("kids-corner/tours").length
      ? byCategory("kids-corner/tours").map(
          (post) => `- [${post.title ?? "---"}](${postMarkdownPath(post)})`
        )
      : ["- No tours yet."]),
    "",
    "### Polls",
    "",
    ...(byCategory("kids-corner/polls").length
      ? byCategory("kids-corner/polls").map(
          (post) => `- [${post.title ?? "---"}](${postMarkdownPath(post)})`
        )
      : ["- No polls yet."]),
    "",
    `Full sitemap: [/sitemap.md](/sitemap.md)`,
  ];

  return lines.join("\n");
}

export function buildSitemapMd(posts: Post[]): string {
  const byCategory = (category: PostCategory) =>
    posts.filter((post) => post.category === category);

  const lines = [
    "# Sitemap",
    "",
    "> Machine-readable overview of melissacraven.me",
    "",
    "## Pages",
    "",
    ...STATIC_PAGES.map(
      (page) =>
        `- [${page.label}](${page.path === "/" ? "/index.md" : `${page.path}.md`}) — ${PAGE_META[page.path]?.description ?? ""}`
    ),
    "",
    "## Travel",
    "",
    ...(byCategory("travel").length
      ? byCategory("travel").map(
          (post) =>
            `- [${post.title ?? "---"}](${postMarkdownPath(post)})${post.excerpt ? ` — ${post.excerpt}` : ""}`
        )
      : ["- No travel posts yet."]),
    "",
    "## Fulbright Vignettes",
    "",
    ...(byCategory("fulbright").length
      ? byCategory("fulbright").map(
          (post) =>
            `- [${post.title ?? "---"}](${postMarkdownPath(post)})${post.excerpt ? ` — ${post.excerpt}` : ""}`
        )
      : ["- No vignettes yet."]),
    "",
    "## Kids' Corner Tours",
    "",
    ...(byCategory("kids-corner/tours").length
      ? byCategory("kids-corner/tours").map(
          (post) =>
            `- [${post.title ?? "---"}](${postMarkdownPath(post)})${post.excerpt ? ` — ${post.excerpt}` : ""}`
        )
      : ["- No tours yet."]),
    "",
    "## Kids' Corner Polls",
    "",
    ...(byCategory("kids-corner/polls").length
      ? byCategory("kids-corner/polls").map(
          (post) =>
            `- [${post.title ?? "---"}](${postMarkdownPath(post)})${post.excerpt ? ` — ${post.excerpt}` : ""}`
        )
      : ["- No polls yet."]),
  ];

  return lines.join("\n");
}
