import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export type PostCategory =
  | "travel"
  | "fulbright"
  | "kids-corner/polls"
  | "kids-corner/tours"
  | "author";

const KIDS_CORNER_CATEGORIES: PostCategory[] = [
  "kids-corner/polls",
  "kids-corner/tours",
];

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`
  );
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && featured == true && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`
  );
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == $category && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`,
    {
      category,
    }
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getPostByCategory(
  slug: string,
  category: PostCategory
): Promise<Post | null> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == $category && slug.current == $slug][0]`,
    {
      slug,
      category,
    }
  );
}

export async function getResources(): Promise<Resource[]> {
  return await sanityClient.fetch(
    groq`*[_type == "resource" && defined(slug.current)] | order(_createdAt desc){
      ...,
      downloads[]{
        label,
        "url": file.asset->url
      }
    }`
  );
}

export async function getKidsCornerPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category in $categories && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`,
    { categories: KIDS_CORNER_CATEGORIES }
  );
}

export async function getLatestPostByCategory(
  category: PostCategory
): Promise<Post | null> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == $category && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0]`,
    { category }
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch(
    groq`*[_type == "siteSettings"][0]{
      siteTitle,
      bio,
      headshot,
      brandName,
      footerText,
      home
    }`
  );
}

export async function getTravelPage(): Promise<TravelPageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "travelPage"][0]{ intro }`
  );
}

export async function getFulbrightPage(): Promise<FulbrightPageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "fulbrightPage"][0]{ intro, vignettesDescription, resourcesDescription, disclaimer }`
  );
}

export async function getKidsCornerPage(): Promise<KidsCornerPageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "kidsCornerPage"][0]{ intro }`
  );
}

export async function getAuthorPage(): Promise<BasicPageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "authorPage"][0]{ intro }`
  );
}

export async function getContactPage(): Promise<ContactPageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "contactPage"][0]{ intro, contactLinks }`
  );
}

export async function getBooks(): Promise<Book[]> {
  return await sanityClient.fetch(
    groq`*[_type == "book"] | order(select(status == "published" => 0, status == "upcoming" => 1, 2) asc, title asc){
      title,
      coverImage,
      description,
      purchaseLinks,
      status
    }`
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  category?: PostCategory;
  featured?: boolean;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}

export interface ResourceDownload {
  label?: string;
  url?: string;
}

export interface Resource {
  _type: "resource";
  _createdAt: string;
  title?: string;
  slug: Slug;
  description?: string;
  body?: PortableTextBlock[];
  downloads?: ResourceDownload[];
}

export interface SiteSettings {
  siteTitle?: string;
  bio?: PortableTextBlock[];
  headshot?: ImageAsset & { alt?: string };
  brandName?: string;
  footerText?: string;
  home?: HomePageCopy;
}

export interface TravelPageCopy {
  intro?: PortableTextBlock[];
}

export interface BasicPageCopy {
  intro?: PortableTextBlock[];
}

export interface HomePageCopy {
  headline?: string;
  travelDescription?: PortableTextBlock[];
  fulbrightDescription?: PortableTextBlock[];
  kidsDescription?: PortableTextBlock[];
  authorDescription?: PortableTextBlock[];
  contactDescription?: PortableTextBlock[];
}

export interface FulbrightPageCopy {
  intro?: PortableTextBlock[];
  vignettesDescription?: PortableTextBlock[];
  resourcesDescription?: PortableTextBlock[];
  disclaimer?: PortableTextBlock[];
}

export interface KidsCornerPageCopy {
  intro?: PortableTextBlock[];
  pollsSectionDescription?: PortableTextBlock[];
  toursDescription?: PortableTextBlock[];
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface ContactPageCopy {
  intro?: PortableTextBlock[];
  contactLinks?: ContactLink[];
}

export interface BookPurchaseLink {
  label: string;
  url: string;
}

export interface Book {
  title?: string;
  coverImage?: ImageAsset & { alt?: string };
  description?: string;
  purchaseLinks?: BookPurchaseLink[];
  status?: "upcoming" | "published";
}
