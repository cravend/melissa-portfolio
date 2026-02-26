import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image, ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getTravelPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == "travel" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`
  );
}

export async function getTravelPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == "travel" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getFulbrightPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == "fulbright" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`
  );
}

export async function getFulbrightPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && category == "fulbright" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getFulbrightPrepResources(): Promise<Resource[]> {
  return await sanityClient.fetch(
    groq`*[_type == "resource" && category == "fulbright-prep" && defined(slug.current)] | order(_createdAt desc){
      ...,
      downloads[]{
        label,
        "url": file.asset->url
      }
    }`
  );
}

export async function getEsolResources(): Promise<Resource[]> {
  return await sanityClient.fetch(
    groq`*[_type == "resource" && category == "esol" && defined(slug.current)] | order(_createdAt desc){
      ...,
      downloads[]{
        label,
        "url": file.asset->url
      }
    }`
  );
}

export async function getTours(): Promise<Tour[]> {
  return await sanityClient.fetch(
    groq`*[_type == "tour" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getTour(slug: string): Promise<Tour> {
  return await sanityClient.fetch(
    groq`*[_type == "tour" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getLatestTour(): Promise<Tour | null> {
  return await sanityClient.fetch(
    groq`*[_type == "tour" && defined(slug.current)] | order(_createdAt desc)[0]`
  );
}

export async function getActivePoll(): Promise<Poll | null> {
  return await sanityClient.fetch(
    groq`*[_type == "poll" && active == true] | order(_updatedAt desc)[0]`
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch(
    groq`*[_type == "siteSettings"][0]{
      siteTitle,
      bio,
      headshot,
      brandName,
      footerText
    }`
  );
}

export async function getPageCopy(): Promise<PageCopy | null> {
  return await sanityClient.fetch(
    groq`*[_type == "pageCopy"][0]{
      home,
      travel,
      fulbright,
      kidsCorner,
      author,
      contact
    }`
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
  category?: "travel" | "fulbright" | "kids-corner" | "author";
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
  category?: "fulbright-prep" | "esol";
  description?: string;
  body?: PortableTextBlock[];
  downloads?: ResourceDownload[];
}

export interface SiteSettings {
  siteTitle?: string;
  bio?: string;
  headshot?: ImageAsset & { alt?: string };
  brandName?: string;
  footerText?: string;
}

export interface PageCopy {
  home?: HomePageCopy;
  travel?: BasicPageCopy;
  fulbright?: FulbrightPageCopy;
  kidsCorner?: KidsCornerPageCopy;
  author?: BasicPageCopy;
  contact?: BasicPageCopy;
}

export interface BasicPageCopy {
  intro?: string;
}

export interface HomePageCopy {
  travelDescription?: string;
  fulbrightDescription?: string;
  kidsDescription?: string;
  authorDescription?: string;
  contactDescription?: string;
}

export interface FulbrightPageCopy extends BasicPageCopy {
  resourcesDescription?: string;
  esolDescription?: string;
}

export interface KidsCornerPageCopy extends BasicPageCopy {
  pollsSectionDescription?: string;
}

export interface Tour {
  _type: "tour";
  _createdAt: string;
  title?: string;
  slug: Slug;
  description?: string;
  body?: PortableTextBlock[];
  location?: string;
  gallery?: (Image & { alt?: string; caption?: string })[];
}

export interface Poll {
  _type: "poll";
  _createdAt: string;
  question?: string;
  options?: PollOption[];
  active?: boolean;
  resultsDisplay?: "always" | "afterVote" | "hidden";
}

export interface PollOption {
  label?: string;
  votes?: number;
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
