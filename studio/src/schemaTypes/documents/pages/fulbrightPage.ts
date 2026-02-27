import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fulbrightPage',
  title: 'Fulbright Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'resourcesDescription',
      title: 'Resources Description',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'esolDescription',
      title: 'ESOL Description',
      type: 'simpleBlockContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Fulbright Page' }),
  },
})
