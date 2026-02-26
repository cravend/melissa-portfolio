import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'authorPage',
  title: 'Author Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue: "Browse Melissa Craven's current and upcoming books.",
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Author Page' }),
  },
})
