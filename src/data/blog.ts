import fm from 'front-matter'
import type { BlogPost, BlogPostMeta } from '@/types/blog'

type BlogFrontmatter = {
  title?: string
  date?: string
  description?: string
  tags?: string[]
}

const modules = import.meta.glob<string>('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parsePosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? ''
    const slug = filename.replace(/\.md$/, '')
    const { attributes, body } = fm<BlogFrontmatter>(raw)

    posts.push({
      title: attributes.title ?? 'Untitled',
      date: attributes.date ?? '',
      description: attributes.description ?? '',
      tags: Array.isArray(attributes.tags) ? attributes.tags : [],
      slug,
      content: body,
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const blogPosts: BlogPost[] = parsePosts()

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllPostMeta(): BlogPostMeta[] {
  return blogPosts.map(({ content: _, ...meta }) => meta)
}
