import { formatDate } from "./index";
import { formatMarkdownPage } from "./markdown";
import { portableTextToMarkdown } from "./portableTextToMarkdown";
import { getPostPath } from "./routes";
import { urlFor } from "./image";
import { PAGE_META } from "./seo";
import type {
  Book,
  ContactPageCopy,
  FulbrightPageCopy,
  KidsCornerPageCopy,
  Post,
  Resource,
  SiteSettings,
} from "./sanity";

export function buildPostMarkdown(post: Post, canonicalPath: string): string {
  const title = post.title ?? "---";
  const sections: string[] = [`# ${title}`];

  if (post.excerpt) sections.push(post.excerpt);

  const date = post.publishedAt || post._createdAt;
  if (date) sections.push(`*Published ${formatDate(date)}*`);

  if (post.mainImage?.asset) {
    const alt =
      post.mainImage.alt && post.mainImage.alt !== "Post image"
        ? post.mainImage.alt
        : title;
    sections.push(
      `![${alt}](${urlFor(post.mainImage).width(960).height(480).fit("max").url()})`
    );
  }

  const body = portableTextToMarkdown(post.body);
  if (body) sections.push(body);

  return formatMarkdownPage(
    {
      title,
      description: post.excerpt,
      canonicalPath,
      lastUpdated: post._updatedAt ?? post.publishedAt ?? post._createdAt,
    },
    sections.join("\n\n")
  );
}

export function buildHomeMarkdown(
  siteSettings: SiteSettings | null,
  featuredPosts: Post[]
): string {
  const meta = PAGE_META["/"];
  const homeCopy = siteSettings?.home;
  const headline = homeCopy?.headline ?? "Writing, Teaching, and Storytelling";
  const sections: string[] = [`# ${headline}`];

  const bio = portableTextToMarkdown(siteSettings?.bio);
  if (bio) sections.push(bio);

  const recentPosts = featuredPosts
    .filter((p) => p.category === "fulbright" || p.category === "travel")
    .slice(0, 4);

  if (recentPosts.length) {
    sections.push("## Latest");
    sections.push(
      recentPosts
        .map((post) => {
          const path = getPostPath(post.slug.current, post.category);
          return `- [${post.title ?? "---"}](${path}.md)`;
        })
        .join("\n")
    );
  }

  sections.push("## Explore");
  const exploreSections: string[] = [];

  if (homeCopy?.fulbrightDescription?.length) {
    exploreSections.push(
      `### Fulbright\n\n${portableTextToMarkdown(homeCopy.fulbrightDescription)}\n\n[View Fulbright](/fulbright.md)`
    );
  }
  if (homeCopy?.kidsDescription?.length) {
    exploreSections.push(
      `### Kids' Corner\n\n${portableTextToMarkdown(homeCopy.kidsDescription)}\n\n[View Kids' Corner](/kids-corner.md)`
    );
  }
  if (homeCopy?.authorDescription?.length) {
    exploreSections.push(
      `### Author\n\n${portableTextToMarkdown(homeCopy.authorDescription)}\n\n[View Author](/author.md)`
    );
  }
  if (homeCopy?.travelDescription?.length) {
    exploreSections.push(
      `### Travel\n\n${portableTextToMarkdown(homeCopy.travelDescription)}\n\n[View Travel](/travel.md)`
    );
  }
  if (homeCopy?.contactDescription?.length) {
    exploreSections.push(
      `### Contact\n\n${portableTextToMarkdown(homeCopy.contactDescription)}\n\n[View Contact](/contact.md)`
    );
  }

  sections.push(exploreSections.join("\n\n"));

  return formatMarkdownPage(
    { title: meta.title, description: meta.description, canonicalPath: "/" },
    sections.join("\n\n")
  );
}

export function buildTravelIndexMarkdown(
  intro: ReturnType<typeof portableTextToMarkdown> | undefined,
  posts: Post[]
): string {
  const meta = PAGE_META["/travel"];
  const sections: string[] = ["# Travel"];

  if (intro) sections.push(intro);

  if (posts.length) {
    sections.push(
      posts
        .map((post) => `- [${post.title ?? "---"}](/travel/${post.slug.current}.md)`)
        .join("\n")
    );
  } else {
    sections.push("No travel posts are published yet.");
  }

  return formatMarkdownPage(
    { title: meta.title, description: meta.description, canonicalPath: "/travel" },
    sections.join("\n\n")
  );
}

export function buildFulbrightIndexMarkdown(
  fulbrightPage: FulbrightPageCopy | null,
  posts: Post[],
  resources: Resource[]
): string {
  const meta = PAGE_META["/fulbright"];
  const sections: string[] = ["# Fulbright"];

  const intro = portableTextToMarkdown(fulbrightPage?.intro);
  if (intro) sections.push(intro);

  sections.push("## Vignettes");
  const vignettesDescription = portableTextToMarkdown(
    fulbrightPage?.vignettesDescription
  );
  if (vignettesDescription) sections.push(vignettesDescription);

  if (posts.length) {
    sections.push(
      posts
        .map(
          (post) =>
            `- [${post.title ?? "---"}](/fulbright/${post.slug.current}.md)`
        )
        .join("\n")
    );
  } else {
    sections.push("No vignettes are published yet.");
  }

  sections.push("## Resources");
  const resourcesDescription = portableTextToMarkdown(
    fulbrightPage?.resourcesDescription
  );
  if (resourcesDescription) sections.push(resourcesDescription);

  if (resources.length) {
    sections.push(
      resources
        .map((resource) => `- ${resource.title ?? "---"}: ${resource.description ?? ""}`)
        .join("\n")
    );
    sections.push("[View all resources](/fulbright/resources.md)");
  } else {
    sections.push("No resources are published yet.");
  }

  const disclaimer = portableTextToMarkdown(fulbrightPage?.disclaimer);
  if (disclaimer) sections.push(disclaimer);

  return formatMarkdownPage(
    { title: meta.title, description: meta.description, canonicalPath: "/fulbright" },
    sections.join("\n\n")
  );
}

export function buildFulbrightResourcesMarkdown(
  fulbrightPage: FulbrightPageCopy | null,
  resources: Resource[]
): string {
  const meta = PAGE_META["/fulbright/resources"];
  const sections: string[] = ["# Resources"];

  const pageDescription = portableTextToMarkdown(
    fulbrightPage?.resourcesDescription
  );
  if (pageDescription) sections.push(pageDescription);

  if (resources.length) {
    for (const resource of resources) {
      const title = resource.title ?? "---";
      sections.push(`## ${title}`);
      if (resource.description) sections.push(resource.description);
      const body = portableTextToMarkdown(resource.body);
      if (body) sections.push(body);
      if (resource.downloads?.length) {
        sections.push(
          resource.downloads
            .map((download) =>
              download.url
                ? `- [${download.label ?? "Download"}](${download.url})`
                : `- ${download.label ?? "Download"}`
            )
            .join("\n")
        );
      }
    }
  } else {
    sections.push("No resources are published yet.");
  }

  const disclaimer = portableTextToMarkdown(fulbrightPage?.disclaimer);
  if (disclaimer) sections.push(disclaimer);

  return formatMarkdownPage(
    {
      title: meta.title,
      description: meta.description,
      canonicalPath: "/fulbright/resources",
    },
    sections.join("\n\n")
  );
}

export function buildKidsCornerMarkdown(
  kidsCornerPage: KidsCornerPageCopy | null,
  polls: Post[],
  tours: Post[]
): string {
  const meta = PAGE_META["/kids-corner"];
  const sections: string[] = ["# Kids' Corner"];

  const intro = portableTextToMarkdown(kidsCornerPage?.intro);
  if (intro) sections.push(intro);

  sections.push("## Tours");
  if (tours.length) {
    sections.push(
      tours
        .map(
          (tour) =>
            `- [${tour.title ?? "---"}](/kids-corner/tours/${tour.slug.current}.md)`
        )
        .join("\n")
    );
  } else {
    sections.push("Tours for young learners are coming soon.");
  }

  sections.push("## Polls");
  if (polls.length) {
    sections.push(
      polls
        .map(
          (poll) =>
            `- [${poll.title ?? "---"}](/kids-corner/polls/${poll.slug.current}.md)`
        )
        .join("\n")
    );
  } else {
    sections.push("A new question is coming soon.");
  }

  return formatMarkdownPage(
    {
      title: meta.title,
      description: meta.description,
      canonicalPath: "/kids-corner",
    },
    sections.join("\n\n")
  );
}

export function buildKidsCornerToursIndexMarkdown(
  kidsCornerPage: KidsCornerPageCopy | null,
  tours: Post[]
): string {
  const meta = PAGE_META["/kids-corner/tours"];
  const sections: string[] = ["# Tours"];

  const toursDescription = portableTextToMarkdown(kidsCornerPage?.toursDescription);
  if (toursDescription) sections.push(toursDescription);

  if (tours.length) {
    sections.push(
      tours
        .map(
          (tour) =>
            `- [${tour.title ?? "---"}](/kids-corner/tours/${tour.slug.current}.md)`
        )
        .join("\n")
    );
  } else {
    sections.push("No tours are published yet.");
  }

  return formatMarkdownPage(
    {
      title: meta.title,
      description: meta.description,
      canonicalPath: "/kids-corner/tours",
    },
    sections.join("\n\n")
  );
}

export function buildAuthorMarkdown(
  intro: ReturnType<typeof portableTextToMarkdown> | undefined,
  books: Book[]
): string {
  const meta = PAGE_META["/author"];
  const sections: string[] = ["# Author"];

  if (intro) sections.push(intro);

  const publishedBooks = books.filter((b) => b.status === "published");
  const upcomingBooks = books.filter((b) => b.status === "upcoming");

  if (publishedBooks.length) {
    sections.push("## Published");
    for (const book of publishedBooks) {
      sections.push(`### ${book.title ?? "---"}`);
      if (book.description) sections.push(book.description);
      if (book.purchaseLinks?.length) {
        sections.push(
          book.purchaseLinks
            .map((link) => `- [${link.label}](${link.url})`)
            .join("\n")
        );
      }
    }
  }

  if (upcomingBooks.length) {
    sections.push("## Upcoming");
    for (const book of upcomingBooks) {
      sections.push(`### ${book.title ?? "---"} *(Coming Soon)*`);
      if (book.description) sections.push(book.description);
    }
  }

  if (!books.length) {
    sections.push("Books are on the way. Check back soon for updates.");
  }

  return formatMarkdownPage(
    { title: meta.title, description: meta.description, canonicalPath: "/author" },
    sections.join("\n\n")
  );
}

export function buildContactMarkdown(contactPage: ContactPageCopy | null): string {
  const meta = PAGE_META["/contact"];
  const sections: string[] = ["# Contact"];

  const intro = portableTextToMarkdown(contactPage?.intro);
  if (intro) sections.push(intro);

  if (contactPage?.contactLinks?.length) {
    sections.push(
      contactPage.contactLinks
        .map((link) => `- [${link.label}](${link.url})`)
        .join("\n")
    );
  }

  return formatMarkdownPage(
    { title: meta.title, description: meta.description, canonicalPath: "/contact" },
    sections.join("\n\n")
  );
}
