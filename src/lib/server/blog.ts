import fm from 'front-matter'
import { marked } from 'marked'

export type BlogPostMeta = {
  title: string
  date: string
  description: string
  tags: string[]
  slug: string
}

export type BlogPost = BlogPostMeta & {
  /** Rendered HTML (GitHub-flavored markdown). */
  html: string
}

type BlogFrontmatter = {
  title?: string
  date?: string
  description?: string
  tags?: string[]
  draft?: boolean
}

const modules = import.meta.glob<string>('/src/content/blog/*.md', {
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

    if (attributes.draft) continue

    posts.push({
      title: attributes.title ?? 'Untitled',
      date: attributes.date ?? '',
      description: attributes.description ?? '',
      tags: Array.isArray(attributes.tags) ? attributes.tags : [],
      slug,
      // Posts are authored in this repo, so their HTML is trusted.
      html: marked.parse(body, { gfm: true, async: false }),
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const blogPosts: BlogPost[] = parsePosts()

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllPostMeta(): BlogPostMeta[] {
  return blogPosts.map(({ html: _, ...meta }) => meta)
}
