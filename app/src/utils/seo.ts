export const SITE_URL = "https://melissacraven.me";

export const PAGE_META: Record<
  string,
  { title: string; description: string }
> = {
  "/": {
    title: "Melissa Craven — Fulbright Fellow, Educator & Travel Writer",
    description:
      "Melissa Craven is a 2026 Fulbright Distinguished Award recipient researching multilingual education in the UK. Educator, travel writer, and storyteller.",
  },
  "/travel": {
    title: "Travel",
    description:
      "Travel stories and guides from a Fulbright educator exploring the UK — York, Harlaxton, and more.",
  },
  "/fulbright": {
    title: "Fulbright",
    description:
      "Vignettes and resources from Melissa Craven's 2026 Fulbright Distinguished Award in Teaching research in the UK.",
  },
  "/fulbright/resources": {
    title: "Fulbright Resources",
    description:
      "Vignettes and resources from Melissa Craven's 2026 Fulbright Distinguished Award in Teaching research in the UK.",
  },
  "/kids-corner": {
    title: "Kids' Corner",
    description:
      "Educational activities, polls, and virtual tours designed for young learners, by second-grade teacher Melissa Craven.",
  },
  "/kids-corner/polls": {
    title: "Kids' Corner Polls",
    description:
      "Educational activities, polls, and virtual tours designed for young learners, by second-grade teacher Melissa Craven.",
  },
  "/kids-corner/tours": {
    title: "Kids' Corner Tours",
    description:
      "Educational activities, polls, and virtual tours designed for young learners, by second-grade teacher Melissa Craven.",
  },
  "/author": {
    title: "Author",
    description:
      "Book news, writing updates, and storytelling from Melissa Craven.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Get in touch with Melissa Craven about Fulbright research, multilingual education, or classroom observation opportunities in the UK.",
  },
};

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Melissa Craven",
  url: SITE_URL,
  jobTitle: "Educator & Fulbright Research Fellow",
  description:
    "2026 Fulbright Distinguished Award recipient researching multilingual education practices in the UK.",
  sameAs: ["https://www.linkedin.com/in/melissa-craven-fb2526/"],
};

export function buildBlogPostingSchema(params: {
  title: string;
  datePublished: string;
  description?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    datePublished: params.datePublished,
    author: {
      "@type": "Person",
      name: "Melissa Craven",
      url: SITE_URL,
    },
    ...(params.imageUrl && { image: params.imageUrl }),
    ...(params.description && { description: params.description }),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
