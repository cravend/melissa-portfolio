import { defineType } from "sanity";

export default defineType({
  name: "googleDriveEmbed",
  title: "Google Drive Video",
  type: "object",
  fields: [
    {
      name: "url",
      title: "Google Drive URL",
      type: "url",
      description: "Paste the share link from Google Drive (File → Share → Copy link).",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional label shown below the video.",
    },
  ],
  preview: {
    select: { caption: "caption", url: "url" },
    prepare({ caption, url }) {
      return {
        title: caption || "Google Drive Video",
        subtitle: url,
      };
    },
  },
});
