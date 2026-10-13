import { error } from '@sveltejs/kit'
import { BLOG_ENABLED } from '#lib/config/features.ts'
import { getAllPostMeta, getPostBySlug } from '#lib/server/blog.ts'
import type { EntryGenerator, PageServerLoad } from './$types'

export const prerender = BLOG_ENABLED

export const entries: EntryGenerator = () => getAllPostMeta().map(({ slug }) => ({ slug }))

export const load: PageServerLoad = ({ params }) => {
  const post = BLOG_ENABLED ? getPostBySlug(params.slug) : undefined
  if (!post) error(404, 'Not found')
  return { post }
}
