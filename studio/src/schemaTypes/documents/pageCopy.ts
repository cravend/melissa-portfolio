import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageCopy',
  title: 'Page Copy',
  type: 'document',
  fields: [
    defineField({
      name: 'home',
      title: 'Home Page',
      type: 'object',
      fields: [
        defineField({ name: 'travelDescription', title: 'Travel Description', type: 'text', rows: 3 }),
        defineField({
          name: 'fulbrightDescription',
          title: 'Fulbright Description',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'kidsDescription', title: "Kids' Corner Description", type: 'text', rows: 3 }),
        defineField({ name: 'authorDescription', title: 'Author Description', type: 'text', rows: 3 }),
        defineField({ name: 'contactDescription', title: 'Contact Description', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'travel',
      title: 'Travel Page',
      type: 'object',
      fields: [defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 })],
    }),
    defineField({
      name: 'fulbright',
      title: 'Fulbright Page',
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'resourcesDescription',
          title: 'Resources Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'esolDescription',
          title: 'ESOL Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'kidsCorner',
      title: "Kids' Corner Page",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'pollsSectionDescription',
          title: 'Polls Section Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author Page',
      type: 'object',
      fields: [defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 })],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Page',
      type: 'object',
      fields: [defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Page Copy',
      }
    },
  },
})
