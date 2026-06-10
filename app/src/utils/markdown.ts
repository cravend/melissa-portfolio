import { SITE_URL } from "./seo";
import { yamlQuote } from "./portableTextToMarkdown";

export interface MarkdownPageMeta {
  title: string;
  description?: string;
  canonicalPath: string;
  lastUpdated?: string;
}

export function markdownPath(path: string): string {
  if (path === "/" || path === "") return "/index.md";
  return `${path.replace(/\/$/, "")}.md`;
}

export function markdownUrl(path: string): string {
  return `${SITE_URL}${markdownPath(path)}`;
}

export function formatMarkdownPage(meta: MarkdownPageMeta, body: string): string {
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
  const frontmatter = [
    "---",
    `title: ${yamlQuote(meta.title)}`,
    meta.description ? `description: ${yamlQuote(meta.description)}` : null,
    `canonical_url: ${canonicalUrl}`,
    `md_url: ${markdownUrl(meta.canonicalPath)}`,
    meta.lastUpdated ? `last_updated: ${meta.lastUpdated}` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const sitemapFooter = [
    "",
    "## Sitemap",
    "",
    `See the full [sitemap](${SITE_URL}/sitemap.md) for all pages.`,
  ].join("\n");

  return `${frontmatter}\n\n${body.trim()}${sitemapFooter}`;
}

export const SITEMAP_FOOTER_LINK = `${SITE_URL}/sitemap.md`;
