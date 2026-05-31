import type { ComponentType, SVGProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Code2, Database, Instagram, Layers, Linkedin, Mail, Server } from 'lucide-react'
import SpotifyIcon from '../components/SpotifyIcon'
import XIcon from '../components/XIcon'

export type ProjectLinkType = 'github' | 'demo' | 'paper'

export type ProjectLink = {
  type: ProjectLinkType
  href: string
  label?: string // optional override; defaults derived from type
}

export type Project = {
  title: string
  description: string
  stack: string[]
  links?: ProjectLink[]
  featured?: boolean // reserved; unused for now
}

export type SkillGroup = {
  label: string
  icon: LucideIcon
  items: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  description: string
  descriptionLinks?: Array<{ text: string; href: string }>
  link?: string
}

export type ContactMethod = {
  label: string
  detail: string
  href: string
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
}

export const projects: Project[] = [
  {
    title: 'HyperZero',
    description:
      'AlphaZero-style RL agent for N-dimensional Connect-K gameplay. Trained with consumer-grade hardware.',
    stack: ['Python', 'PyTorch', 'CUDA'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/hyperzero' },
      { type: 'demo', href: 'https://hyperzero-web-demo.vercel.app' },
    ],
  },
  {
    title: 'Switchboard CLI',
    description:
      'ML job orchestrator with provider adapters, auto-routing, telemetry, and checkpoint management.',
    stack: ['Go', 'SQLite', 'Docker'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/switchboard-cli' },
    ],
  },
  {
    title: 'Neural Decision Transformers',
    description:
      'Reward-conditioned sequence modeling pipeline for IBL brain-wide Neuropixels recordings.',
    stack: ['Python', 'PyTorch'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/ibl-neural-decision-transformers' },
      // { type: 'paper', href: 'https://...' }, // TODO: add paper/writeup URL
    ],
  },
  {
    title: 'Sweat Streaks',
    description:
      'macOS menu bar app tracking daily coding streaks across GitHub, LeetCode, and agentic coding tools.',
    stack: ['Swift', 'SwiftPM', 'SQLite'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/sweat-streaks' },
    ],
  },
  {
    title: 'Context Grabber',
    description:
      'macOS menu bar app + CLI that captures your applications into structured context for LLMs.',
    stack: ['Swift', 'Go', 'TypeScript', 'Bun'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/context_grabber' },
    ],
  },
  {
    title: 'Neural ViT',
    description:
      'Vision Transformers for classifying mouse genotypes from local field potential spectrograms.',
    stack: ['Python', 'PyTorch', 'BigQuery', 'GCS', 'Vertex AI'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/neural-vit' },
      // { type: 'paper', href: 'https://...' }, // TODO: add paper/writeup URL
    ],
  },
  {
    title: 'AdaHealth',
    description:
      'AI voice companion for patient check-ins and safety insights. Winner of the Pulse Foundry Agentic AI Hackathon.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    links: [
      { type: 'github', href: 'https://github.com/David-Wu1119/hackathon' },
      // { type: 'demo', href: 'https://...' }, // TODO: add live demo / Devpost URL
    ],
  },
  {
    title: 'Personal Website',
    description:
      'This site! Built with Vite, React, Tailwind, and Three.js.',
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Three.js'],
    links: [
      { type: 'github', href: 'https://github.com/anthonylu23/personal-website' },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: 'InterSystems',
    role: 'Software Engineer Intern',
    period: 'May 2026 – Present',
    location: 'Boston, MA',
    description: 'Developing agentic data tooling.',
    link: 'https://www.intersystems.com',
  },
  {
    company: 'DermImpact',
    role: 'Founding Engineer',
    period: 'Feb 2026 – May 2026',
    location: 'New York, NY',
    description:
      'Full-stack platform for dermatologic note generation and image analysis. Surveyed a 40+ person derm clinic to shape product direction and drive clinical adoption.',
  },
  {
    company: 'Biokind Analytics',
    role: 'Data Engineer',
    period: 'Jan 2026 – May 2026',
    location: 'New York, NY',
    description:
      'ETL pipelines processing donor records at scale with FastAPI orchestration for the Reproductive Health Access Project.',
    descriptionLinks: [
      { text: 'Reproductive Health Access Project', href: 'https://www.reproductiveaccess.org/' },
    ],
    link: 'https://www.biokind.org/',
  },
  {
    company: 'Pulse Foundry',
    role: 'Software Engineer',
    period: 'Dec 2025 – May 2026',
    location: 'New York, NY',
    description:
      'Automated newsletter pipeline with semantic ranking, scheduled workers, and web scraping, serving 3k+ subscribers. React dashboard for review and pipeline configuration.',
    link: 'https://pulsefoundry.ai/about',
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
    detail: '@anthxny245',
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
