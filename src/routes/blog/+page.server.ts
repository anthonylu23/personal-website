import { error } from '@sveltejs/kit'
import { BLOG_ENABLED } from '#lib/config/features.ts'
import { getAllPostMeta } from '#lib/server/blog.ts'
import type { PageServerLoad } from './$types'

// With the blog off, skip prerendering so the route 404s instead of failing the build.
export const prerender = BLOG_ENABLED

export const load: PageServerLoad = () => {
  if (!BLOG_ENABLED) error(404, 'Not found')
  return { posts: getAllPostMeta().filter((post) => post.slug !== 'current-stack') }
}
