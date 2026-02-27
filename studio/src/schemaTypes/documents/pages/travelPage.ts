import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'travelPage',
  title: 'Travel Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'simpleBlockContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Travel Page' }),
  },
})
