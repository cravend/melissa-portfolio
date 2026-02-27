import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Simple Block Content",
  name: "simpleBlockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
        ],
      },
    }),
  ],
});
