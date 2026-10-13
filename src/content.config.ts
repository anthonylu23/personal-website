import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z.object({
    title: z.string().default('Untitled'),
    // Quoted dates stay strings; unquoted YAML dates parse as Date objects.
    date: z
      .union([z.string(), z.date()])
      .transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10)))
      .default(''),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
