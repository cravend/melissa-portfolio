import { getCliClient } from "sanity/cli";

type PortableTextBody = Record<string, unknown> & {
  _key: string;
  _type: string;
  style?: string;
  children?: { _key: string; marks?: string[]; text?: string }[];
  markDefs?: { _key: string; _type: string; href?: string }[];
};

function transformBody(body: PortableTextBody[]) {
  const result: PortableTextBody[] = [];

  for (const block of body) {
    if (block._type === "block" && block.style === "h3") {
      const linkDef = block.markDefs?.find(
        (mark) =>
          mark._type === "link" && mark.href?.includes("drive.google.com")
      );

      if (linkDef?.href) {
        const linkedSpan = block.children?.find((child) =>
          child.marks?.includes(linkDef._key)
        );

        result.push({
          _key: block._key,
          _type: "googleDriveEmbed",
          url: linkDef.href,
          caption: linkedSpan?.text || undefined,
        });
        continue;
      }
    }

    result.push(block);
  }

  return result;
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const posts = await client.fetch<
    { _id: string; title: string; body: PortableTextBody[] }[]
  >(
    `*[_type == "post" && defined(body)]{
      _id,
      title,
      body
    }`
  );

  let updated = 0;

  for (const post of posts) {
    const nextBody = transformBody(post.body);
    const changed = JSON.stringify(nextBody) !== JSON.stringify(post.body);

    if (!changed) continue;

    await client.patch(post._id).set({ body: nextBody }).commit();
    updated += 1;
    console.log(`Updated: ${post.title}`);
  }

  console.log(`Done. Updated ${updated} post(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
