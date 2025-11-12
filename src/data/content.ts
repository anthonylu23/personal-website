import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Code2, Database, Github, Instagram, Layers, Linkedin, Mail, Phone, Server, Twitter } from 'lucide-react'

export type Project = {
  title: string
  description: string
  stack: string[]
  link: string
}

export type GalleryItem = {
  title: string
  location: string
  image: string
  galleryImages: string[]
  tags: string[]
}

export type SkillGroup = {
  label: string
  icon: LucideIcon
  items: string[]
}

export type ContactMethod = {
  label: string
  detail: string
  href: string
  icon: LucideIcon
}

const photoImports = import.meta.glob('./photos/**/*.{png,jpg,jpeg,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type PhotoProjectMetadata = {
  id: string
  title: string
  location: string
  tags: string[]
  cover?: string
}

const galleryProjects: PhotoProjectMetadata[] = [
  {
    id: 'austin',
    title: 'Austin Nights',
    location: 'Austin, TX',
    tags: ['City', 'Night', '35mm'],
  },
  {
    id: 'big_bend',
    title: 'Big Bend Trails',
    location: 'Big Bend National Park, TX',
    tags: ['Desert', 'Landscape', 'Roadtrip'],
  },
  {
    id: 'colorado_sun',
    title: 'Colorado Sun',
    location: 'Colorado, USA',
    tags: ['Film', 'Mountain Light'],
  },
  {
    id: 'hangzhou',
    title: 'Hangzhou Reflections',
    location: 'Hangzhou, China',
    tags: ['Travel', 'Water', 'City'],
  },
  {
    id: 'hawaii',
    title: 'Hawaiian Coastlines',
    location: 'Oahu, HI',
    tags: ['Ocean', 'Tropical'],
  },
  {
    id: 'kyoto',
    title: 'Kyoto Streets',
    location: 'Kyoto, Japan',
    tags: ['Film', 'Street', 'Japan'],
  },
  {
    id: 'london_summer',
    title: 'London Summer',
    location: 'London, UK',
    tags: ['Film', 'Street'],
  },
  {
    id: 'los_angeles',
    title: 'Los Angeles Glow',
    location: 'Los Angeles, CA',
    tags: ['City', 'Night'],
  },
  {
    id: 'nyc',
    title: 'Scenes from NYC',
    location: 'New York, NY',
    tags: ['Street', 'City'],
  },
  {
    id: 'pacific_coast',
    title: 'Pacific Coast Highway',
    location: 'California Coast, USA',
    tags: ['Roadtrip', 'Coastline'],
  },
  {
    id: 'pi',
    title: 'PI Film Notes',
    location: 'Studio + Bay Area',
    tags: ['35mm', 'Experiments'],
  },
  {
    id: 'switzerland',
    title: 'Swiss Peaks',
    location: 'Switzerland',
    tags: ['Alpine', 'Landscape'],
  },
  {
    id: 'tokyo',
    title: 'Tokyo Nights',
    location: 'Tokyo, Japan',
    tags: ['Neon', 'City'],
  },
  {
    id: 'views_from_the_bay',
    title: 'Views from the Bay',
    location: 'San Francisco Bay Area, CA',
    tags: ['Bay Area', 'Film'],
  },
  {
    id: 'yosemite',
    title: 'Yosemite Valley',
    location: 'Yosemite National Park, CA',
    tags: ['National Park', 'Landscape'],
  },
]

const buildGalleryItem = (project: PhotoProjectMetadata): GalleryItem | null => {
  const entries = Object.entries(photoImports)
    .filter(([path]) => path.startsWith(`./photos/${project.id}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))

  if (entries.length === 0) {
    return null
  }

  const galleryImages = entries.map(([, src]) => src)
  const coverEntry = project.cover
    ? entries.find(([path]) => path.endsWith(project.cover!))
    : undefined
  const coverImage = (coverEntry ?? entries[0])[1]

  return {
    title: project.title,
    location: project.location,
    image: coverImage,
    galleryImages,
    tags: project.tags,
  }
}

export const projects: Project[] = [
  {
    title: 'Openbook-CLI',
    description:
      'Open-source, highly customizable CLI companion that lets you learn from and chat with your own notes, PDFs, and research archives.',
    stack: ['TypeScript', 'Python', 'LangChain', 'Ollama', 'ChromaDB'],
    link: 'https://github.com/anthonylu23/openbook',
  },
  {
    title: 'Scout',
    description:
      'AI-powered field guide that pinpoints photo viewpoints by time, location, ideal camera settings, and expected weather conditions.',
    stack: ['React', 'JavaScript', 'Python', 'FastAPI', 'Google GenAI', 'Vercel'],
    link: 'https://github.com/anthonylu23/scout',
  },
  {
    title: 'Photo Search',
    description:
      'Local-first, private querying tool for exploring your photography library with semantic search and intuitive filtering.',
    stack: ['RAG', 'Python', 'ChromaDB', 'OpenCLIP', 'LangChain'],
    link: 'https://github.com/anthonylu23/photo_search',
  },
  {
    title: 'F1 Prediction Dashboard',
    description:
      'Streamlit dashboard that models race outcomes, runs feature engineering, and even calculates prop-betting odds with custom ML models.',
    stack: ['Machine Learning', 'Python', 'XGBoost', 'NumPy/Pandas', 'Streamlit', 'AWS', 'Docker'],
    link: 'https://github.com/anthonylu23/f1_prediction_dashboard',
  },
  {
    title: 'Personal Website',
    description:
      'This site! Built with Vite + React, Tailwind, Three.js flourishes, and performant content sections optimized for showcasing my skills and interests.',
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Three.js'],
    link: 'https://github.com/anthonylu23/personal-website',
  },
]

export const gallery: GalleryItem[] = galleryProjects
  .map((project) => buildGalleryItem(project))
  .filter((item): item is GalleryItem => Boolean(item))

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    icon: Code2,
    items: ['TypeScript', 'Python', 'JavaScript', 'SQL', 'C/C++', 'Java', 'HTML/CSS', 'LaTeX', 'Assembly'],
  },
  {
    label: 'Frameworks',
    icon: Layers,
    items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'ChromaDB'],
  },
  {
    label: 'Data / ML',
    icon: Database,
    items: ['PyTorch', 'scikit-learn', 'XGBoost', 'NumPy', 'Pandas', 'SciPy', 'OpenCV'],
  },
  {
    label: 'AI',
    icon: Brain,
    items: ['LangChain', 'OpenAI', 'Hugging Face', 'Anthropic', 'Google GenAI', 'Ollama'],
  },
  {
    label: 'Systems & Infra',
    icon: Server,
    items: ['AWS', 'Google Cloud', 'Docker', 'Serverless', 'PostgreSQL', 'CI/CD', 'Git', 'Vercel'],
  },
  {
    label: 'Relevant Coursework',
    icon: BookOpen,
    items: [
      'Data Structures & Algorithms',
      'Algorithms',
      'Machine Learning',
      'Artificial Intelligence',
      'Intro to Deep Learning & LLMs',
      'Principles of Data Science',
      'Neural Data Science',
      'Computer Systems & Organization',
      'Database Systems',
      'Data Management & Analysis',
      'Causal Inference',
      'Discrete Mathematics',
      'Linear Algebra',
      'Probability & Statistics',
      'Parallel Computing',
      'Agile Development & DevOps',
    ],
  },
]

export const contactMethods: ContactMethod[] = [
  {
    label: 'Email',
    detail: 'luanthony523@gmail.com',
    href: 'mailto:luanthony523@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    detail: 'github.com/anthonylu23',
    href: 'https://github.com/anthonylu23',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    detail: 'linkedin.com/in/ayl24',
    href: 'https://linkedin.com/in/ayl24',
    icon: Linkedin,
  },
  {
    label: 'Phone',
    detail: '+1 737-484-6609',
    href: 'tel:+17374846609',
    icon: Phone,
  },
  {
    label: 'Instagram',
    detail: '@anthonyyy_lu',
    href: 'https://www.instagram.com/anthonyyy_lu/',
    icon: Instagram,
  },
  {
    label: 'X',
    detail: '@anth0nyyy1_',
    href: 'https://x.com/anth0nyyy1_',
    icon: Twitter,
  },
]
