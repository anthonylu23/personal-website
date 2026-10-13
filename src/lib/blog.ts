import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blog'>

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  )
}
