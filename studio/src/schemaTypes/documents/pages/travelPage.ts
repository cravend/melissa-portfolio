import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'travelPage',
  title: 'Travel Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      initialValue: 'Stories, reflections, and practical notes from the road.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Travel Page' }),
  },
})
