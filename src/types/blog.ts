export type BlogPostMeta = {
  title: string
  date: string
  description: string
  tags: string[]
  slug: string
}

export type BlogPost = BlogPostMeta & {
  content: string
}
