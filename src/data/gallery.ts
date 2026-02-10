import manifest from './photo-manifest.json'

export type GalleryItem = {
  id: string
  title: string
  location: string
  image: string
  imageWebp?: string
  galleryImages: string[]
}

type GalleryProject = {
  id: string
  title: string
  location: string
  folder: string
  cover: string
}

const galleryProjects: GalleryProject[] = [
  { id: 'austin', title: 'Austin', location: 'Austin, TX', folder: 'austin', cover: 'DSC00901' },
  { id: 'big_bend', title: 'Big Bend', location: 'Big Bend National Park, TX', folder: 'big_bend', cover: 'IMG_2576 2' },
  { id: 'colorado_sun', title: 'Colorado', location: 'Colorado, USA', folder: 'colorado_sun', cover: 'IMG_7971' },
  { id: 'hangzhou', title: 'Hangzhou', location: 'Hangzhou, China', folder: 'hangzhou', cover: 'DSCF0470' },
  { id: 'hawaii', title: 'Hawaii', location: 'Hawaii, USA', folder: 'hawaii', cover: 'IMG_3902 2' },
  { id: 'kyoto', title: 'Kyoto', location: 'Kyoto, Japan', folder: 'kyoto', cover: 'DSCF0343' },
  { id: 'london_summer', title: 'London', location: 'London, UK', folder: 'london_summer', cover: '000161380036 2' },
  { id: 'los_angeles', title: 'Los Angeles', location: 'Los Angeles, CA', folder: 'los_angeles', cover: 'IMG_1751 2' },
  { id: 'barcelona', title: 'Barcelona', location: 'Barcelona, Spain', folder: 'Barcelona', cover: 'DSCF0890' },
  { id: 'seville', title: 'Seville', location: 'Seville, Spain', folder: 'Seville', cover: 'DSCF0783' },
  { id: 'granada', title: 'Granada', location: 'Granada, Spain', folder: 'Granada', cover: 'DSCF0819' },
  { id: 'lisbon', title: 'Lisbon', location: 'Lisbon, Portugal', folder: 'Lisbon', cover: 'DSCF0705' },
  { id: 'nyc', title: 'NYC', location: 'New York, NY', folder: 'nyc', cover: 'IMG_1758 2' },
  { id: 'pacific_coast', title: 'Pacific Coast Highway', location: 'California Coast, USA', folder: 'pacific_coast', cover: 'IMG_2575' },
  { id: 'pi', title: 'π', location: 'Austin, TX', folder: 'pi', cover: '0BF97B5C-F9EC-41C2-BCA2-6AC7246E045CDSCF0628' },
  { id: 'switzerland', title: 'Switzerland', location: 'Switzerland', folder: 'switzerland', cover: '000161350020' },
  { id: 'tokyo', title: 'Tokyo', location: 'Tokyo, Japan', folder: 'tokyo', cover: 'DSCF0009' },
  { id: 'views_from_the_bay', title: 'The Bay', location: 'San Francisco Bay Area, CA', folder: 'views_from_the_bay', cover: 'IMG_0182 2' },
  { id: 'yosemite', title: 'Yosemite Valley', location: 'Yosemite National Park, CA', folder: 'yosemite', cover: 'IMG_0164 2' },
]

const toUrl = (folder: string, baseName: string, suffix = '') =>
  `/photos/${folder}/${encodeURIComponent(baseName)}${suffix}.webp`

export const gallery: GalleryItem[] = galleryProjects
  .map((project): GalleryItem | null => {
    const images = (manifest as Record<string, string[]>)[project.folder]
    if (!images || images.length === 0) return null

    return {
      id: project.id,
      title: project.title,
      location: project.location,
      image: toUrl(project.folder, project.cover, '_thumb'),
      galleryImages: images.map((name) => toUrl(project.folder, name)),
    }
  })
  .filter((item): item is GalleryItem => Boolean(item))
