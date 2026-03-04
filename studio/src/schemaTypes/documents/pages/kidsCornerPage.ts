import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kidsCornerPage',
  title: "Kids' Corner Page",
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'simpleBlockContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Kids' Corner Page" }),
  },
})
