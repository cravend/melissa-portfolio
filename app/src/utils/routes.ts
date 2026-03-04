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
  polls: "Polls",
  tours: "Tours",
  post: "Posts",
  posts: "Posts",
};

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  travel: "Travel",
  fulbright: "Fulbright",
  "kids-corner/polls": "Kids' Corner / Polls",
  "kids-corner/tours": "Kids' Corner / Tours",
  author: "Author",
};

export const POST_CATEGORY_ROUTES: Record<
  PostCategory,
  { href: string; label: string }
> = {
  travel: { href: "/travel", label: "Travel" },
  fulbright: { href: "/fulbright", label: "Fulbright" },
  "kids-corner/polls": { href: "/kids-corner/polls", label: "Kids' Corner / Polls" },
  "kids-corner/tours": { href: "/kids-corner/tours", label: "Kids' Corner / Tours" },
  author: { href: "/author", label: "Author" },
};

export const POST_DETAIL_CATEGORY_ROUTES = {
  travel: POST_CATEGORY_ROUTES.travel,
  fulbright: POST_CATEGORY_ROUTES.fulbright,
  "kids-corner/polls": POST_CATEGORY_ROUTES["kids-corner/polls"],
  "kids-corner/tours": POST_CATEGORY_ROUTES["kids-corner/tours"],
} as const;

export function isPostDetailCategory(
  category: PostCategory
): category is keyof typeof POST_DETAIL_CATEGORY_ROUTES {
  return category in POST_DETAIL_CATEGORY_ROUTES;
}

export function getPostPath(slug: string, category?: PostCategory): string {
  if (category) {
    return `${POST_CATEGORY_ROUTES[category].href}/${slug}`;
  }
  return `/posts/${slug}`;
}
