import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'authorPage',
  title: 'Author Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'simpleBlockContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Author Page' }),
  },
})
