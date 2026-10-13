import { error } from '@sveltejs/kit'
import { gallery } from '#lib/data/gallery.ts'
import type { EntryGenerator, PageLoad } from './$types'

export const entries: EntryGenerator = () => gallery.map(({ id }) => ({ id }))

export const load: PageLoad = ({ params }) => {
  const project = gallery.find((item) => item.id === params.id)
  if (!project) error(404, 'Not found')
  return { project }
}
