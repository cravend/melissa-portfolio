import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Melissa Craven',
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'Displayed in the header brand link.',
      initialValue: 'Melissa Craven',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Displayed in the site footer.',
      initialValue: '© 2026 Melissa Craven',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          initialValue: 'Site headshot',
        }),
      ],
    }),
    defineField({
      name: 'home',
      title: 'Home Page',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Writing, Teaching, and Storytelling',
        }),
        defineField({ name: 'travelDescription', title: 'Travel Description', type: 'simpleBlockContent' }),
        defineField({
          name: 'fulbrightDescription',
          title: 'Fulbright Description',
          type: 'simpleBlockContent',
        }),
        defineField({ name: 'kidsDescription', title: "Kids' Corner Description", type: 'simpleBlockContent' }),
        defineField({ name: 'authorDescription', title: 'Author Description', type: 'simpleBlockContent' }),
        defineField({ name: 'contactDescription', title: 'Contact Description', type: 'simpleBlockContent' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
      }
    },
  },
})
