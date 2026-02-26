import type { PostCategory } from "./sanity";

export const NAV_ITEMS = [
  { href: "/travel", label: "Travel" },
  { href: "/fulbright", label: "Fulbright" },
  { href: "/kids-corner", label: "Kids' Corner" },
  { href: "/author", label: "Author" },
  { href: "/contact", label: "Contact" },
] as const;

export const ROUTE_LABELS: Record<string, string> = {
  travel: "Travel",
  fulbright: "Fulbright",
  "kids-corner": "Kids' Corner",
  author: "Author",
  contact: "Contact",
  resources: "Resources",
  esol: "ESOL Tools",
  polls: "Polls",
  tours: "Tours",
  post: "Posts",
  posts: "Posts",
};

export const POST_CATEGORY_ROUTES: Record<
  PostCategory,
  { href: string; label: string }
> = {
  travel: { href: "/travel", label: "Travel" },
  fulbright: { href: "/fulbright", label: "Fulbright" },
  "kids-corner": { href: "/kids-corner", label: "Kids' Corner" },
  author: { href: "/author", label: "Author" },
};

export const POST_DETAIL_CATEGORY_ROUTES = {
  travel: POST_CATEGORY_ROUTES.travel,
  fulbright: POST_CATEGORY_ROUTES.fulbright,
} as const;

export function isPostDetailCategory(
  category: PostCategory
): category is keyof typeof POST_DETAIL_CATEGORY_ROUTES {
  return category === "travel" || category === "fulbright";
}

export function getPostPath(slug: string, category?: PostCategory): string {
  if (category) {
    return `${POST_CATEGORY_ROUTES[category].href}/${slug}`;
  }
  return `/posts/${slug}`;
}
