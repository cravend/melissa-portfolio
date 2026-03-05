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
      name: 'vignettesDescription',
      title: 'Vignettes Description',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'resourcesDescription',
      title: 'Resources Description',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'simpleBlockContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Fulbright Page' }),
  },
})
