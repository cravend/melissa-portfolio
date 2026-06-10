import type {
  ArbitraryTypedObject,
  PortableTextBlock,
  PortableTextSpan,
} from "@portabletext/types";
import { urlFor } from "./image";

type PortableTextValue = (PortableTextBlock | ArbitraryTypedObject)[];

function escapeYaml(value: string): string {
  return value.replace(/"/g, '\\"');
}

function renderSpan(
  span: PortableTextSpan,
  markDefs: PortableTextBlock["markDefs"]
): string {
  let text = span.text;

  for (const mark of span.marks ?? []) {
    if (mark === "strong") text = `**${text}**`;
    else if (mark === "em") text = `*${text}*`;
    else if (mark === "code") text = `\`${text}\``;
    else if (mark === "underline") text = `<u>${text}</u>`;
    else if (mark === "strike-through") text = `~~${text}~~`;
    else {
      const def = markDefs?.find((d) => d._key === mark);
      if (def?._type === "link" && "href" in def && def.href) {
        text = `[${text}](${def.href})`;
      }
    }
  }

  return text;
}

function renderBlock(block: PortableTextBlock): string {
  const text = block.children
    .map((span) => renderSpan(span as PortableTextSpan, block.markDefs))
    .join("");

  switch (block.style) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "blockquote":
      return `> ${text}`;
    case "center":
      return `*${text}*`;
    default:
      return text;
  }
}

function renderListItem(block: PortableTextBlock, ordered: boolean, index: number): string {
  const prefix = ordered ? `${index + 1}. ` : "- ";
  const text = block.children
    .map((span) => renderSpan(span as PortableTextSpan, block.markDefs))
    .join("");
  return `${prefix}${text}`;
}

function renderCustomBlock(block: ArbitraryTypedObject): string {
  if (block._type === "image" && "asset" in block) {
    const alt =
      ("alt" in block && typeof block.alt === "string" && block.alt) || "Image";
    try {
      const src = urlFor(block as Parameters<typeof urlFor>[0]).width(960).url();
      return `![${alt}](${src})`;
    } catch {
      return `*[${alt}]*`;
    }
  }

  if (block._type === "googleDriveEmbed" && "url" in block && block.url) {
    const label =
      ("caption" in block && typeof block.caption === "string" && block.caption) ||
      "Google Drive video";
    return `[${label}](${block.url})`;
  }

  if (block._type === "collapsible") {
    const summary =
      ("summary" in block && typeof block.summary === "string" && block.summary) ||
      "Details";
    const content = Array.isArray(block.content)
      ? portableTextToMarkdown(block.content as PortableTextValue)
      : "";
    return `### ${summary}\n\n${content}`.trim();
  }

  return "";
}

export function portableTextToMarkdown(
  value: PortableTextValue | null | undefined
): string {
  if (!value?.length) return "";

  const lines: string[] = [];
  let listType: string | null = null;
  let listIndex = 0;

  const flushList = () => {
    listType = null;
    listIndex = 0;
  };

  for (const block of value) {
    if (block._type !== "block") {
      flushList();
      const custom = renderCustomBlock(block);
      if (custom) {
        if (lines.length) lines.push("");
        lines.push(custom);
      }
      continue;
    }

    const portableBlock = block as PortableTextBlock;

    if (portableBlock.listItem) {
      const ordered = portableBlock.listItem === "number";
      if (listType !== portableBlock.listItem) {
        if (listType) lines.push("");
        listType = portableBlock.listItem;
        listIndex = 0;
      }
      lines.push(renderListItem(portableBlock, ordered, listIndex));
      listIndex += 1;
      continue;
    }

    if (listType) {
      lines.push("");
      flushList();
    }

    const rendered = renderBlock(portableBlock);
    if (rendered) lines.push(rendered);
  }

  return lines.join("\n\n").trim();
}

export function yamlQuote(value: string): string {
  if (/[:#\n"'&*!?|>@[\]`]/.test(value) || value.startsWith(" ") || value.endsWith(" ")) {
    return `"${escapeYaml(value)}"`;
  }
  return value;
}
