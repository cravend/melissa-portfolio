import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fulbrightPage',
  title: 'Fulbright Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'Follow Fulbright updates, explore preparation materials, and browse ESOL teaching tools.',
    }),
    defineField({
      name: 'resourcesDescription',
      title: 'Resources Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Preparation materials and supporting documents for Fulbright work.',
    }),
    defineField({
      name: 'esolDescription',
      title: 'ESOL Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Classroom tools and lesson support resources for ESOL instruction.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Fulbright Page' }),
  },
})
