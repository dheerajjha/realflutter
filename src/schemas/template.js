export default {
  name: 'template',
  title: 'Templates',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Template Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Flutter', value: 'flutter' },
          { title: 'Firebase', value: 'firebase' },
          { title: 'REST API', value: 'rest-api' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'GetX', value: 'getx' },
          { title: 'Provider', value: 'provider' },
          { title: 'Bloc', value: 'bloc' },
          { title: 'Riverpod', value: 'riverpod' }
        ]
      }
    },
    {
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Education', value: 'education' },
          { title: 'Health & Fitness', value: 'health-fitness' }
        ]
      }
    }
  ]
}; 