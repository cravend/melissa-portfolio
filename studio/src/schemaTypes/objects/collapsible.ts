import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Collapsible",
  name: "collapsible",
  type: "object",
  fields: [
    {
      name: "summary",
      title: "Summary",
      type: "string",
      description: "The clickable text that toggles the collapse",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Centered", value: "center" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
          },
        }),
      ],
    },
  ],
  preview: {
    select: { summary: "summary" },
    prepare({ summary }) {
      return {
        title: summary || "Collapsible",
        subtitle: "Details/summary",
      };
    },
  },
});
