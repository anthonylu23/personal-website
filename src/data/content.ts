import type { ComponentType, SVGProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Code2, Database, Instagram, Layers, Linkedin, Mail, Server } from 'lucide-react'
import SpotifyIcon from '../components/SpotifyIcon'
import XIcon from '../components/XIcon'

export type Project = {
  title: string
  description: string
  stack: string[]
  link?: string
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
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
}

export const projects: Project[] = [
  {
    title: 'Context Grabber',
    description:
      'Menu bar app + CLI that captures your applications into structured context for LLMs.',
    stack: ['Swift', 'Go', 'TypeScript', 'Bun'],
    link: 'https://github.com/anthonylu23/context_grabber',
  },
  {
    title: 'Neural ViT',
    description:
      'Vision Transformers for classifying mouse genotypes from local field potential spectrograms.',
    stack: ['Python', 'PyTorch', 'BigQuery', 'GCS', 'Vertex AI'],
    link: 'https://github.com/anthonylu23/neural-vit',
  },
  {
    title: 'AdaHealth - Hackathon Winner',
    description:
      'AI voice companion for patient check-ins and safety insights.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    link: 'https://github.com/David-Wu1119/hackathon',
  },
  {
    title: 'Openbook-CLI',
    description:
      'CLI tool to chat with your notes, PDFs, and research.',
    stack: ['TypeScript', 'Python', 'LangChain', 'Ollama', 'ChromaDB'],
    link: 'https://github.com/anthonylu23/openbook',
  },
  // {
  //   title: 'Scout',
  //   description:
  //     'AI field guide for photo viewpoints, timing, and camera settings.',
  //   stack: ['React', 'JavaScript', 'Python', 'FastAPI', 'Google GenAI', 'Vercel'],
  //   link: 'https://github.com/anthonylu23/scout',
  // },
  {
    title: 'F1 Prediction Dashboard',
    description:
      'Streamlit dashboard modeling race outcomes and betting odds.',
    stack: ['Python', 'XGBoost', 'NumPy', 'Pandas', 'Streamlit', 'AWS', 'Docker'],
    link: 'https://github.com/anthonylu23/f1_prediction_dashboard',
  },
  // {
  //   title: 'Photo Search',
  //   description:
  //     'Local-first semantic search across your photography library.',
  //   stack: ['RAG', 'Python', 'ChromaDB', 'OpenCLIP', 'LangChain'],
  //   link: 'https://github.com/anthonylu23/photo_search',
  // },
  {
    title: 'Personal Website',
    description:
      'This site! Built with Vite, React, Tailwind, and Three.js.',
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Three.js'],
    link: 'https://github.com/anthonylu23/personal-website',
  },
]

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
    label: 'LinkedIn',
    detail: 'linkedin.com/in/ayl24',
    href: 'https://linkedin.com/in/ayl24',
    icon: Linkedin,
  },
  // {
  //   label: 'Phone',
  //   detail: '+1 737-484-6609',
  //   href: 'tel:+17374846609',
  //   icon: Phone,
  // },
  {
    label: 'Instagram',
    detail: '@anthonyyy_lu',
    href: 'https://www.instagram.com/anthonyyy_lu/',
    icon: Instagram,
  },
  {
    label: 'X',
    detail: '@luanthony245',
    href: 'https://x.com/luanthony245',
    icon: XIcon,
  },
  {
    label: 'Spotify',
    detail: 'Spotify profile',
    href: 'https://open.spotify.com/user/31r3dqo5busdm5pmkfwrpwpew6tm?si=13345562248243a4',
    icon: SpotifyIcon,
  },
]
