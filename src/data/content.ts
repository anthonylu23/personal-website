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

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  description: string
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
      'AlphaZero-style self-play system for N-dimensional Connect-K research.',
    stack: ['Python', 'PyTorch', 'CUDA'],
    link: 'https://github.com/anthonylu23/hyperzero',
  },
  {
    title: 'Switchboard CLI',
    description:
      'ML job orchestrator with provider adapters, durable state, telemetry, and checkpoint management.',
    stack: ['Go', 'SQLite', 'Docker'],
    link: 'https://github.com/anthonylu23/switchboard-cli',
  },
  {
    title: 'Neural Decision Transformers',
    description:
      'Reward-conditioned sequence modeling pipeline for IBL brain-wide Neuropixels recordings.',
    stack: ['Python', 'PyTorch', 'Jupyter'],
    link: 'https://github.com/anthonylu23/ibl-neural-decision-transformers',
  },
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
  // {
  //   title: 'Scout',
  //   description:
  //     'AI field guide for photo viewpoints, timing, and camera settings.',
  //   stack: ['React', 'JavaScript', 'Python', 'FastAPI', 'Google GenAI', 'Vercel'],
  //   link: 'https://github.com/anthonylu23/scout',
  // },
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

export const experiences: Experience[] = [
  {
    company: 'InterSystems',
    role: 'Data Platforms Intern',
    period: 'May 2026 – Aug 2026',
    location: 'Boston, MA',
    description:
      'Developing data infrastructure and developer tooling for InterSystems IRIS.',
    link: 'https://www.intersystems.com',
  },
  {
    company: 'DermImpact',
    role: 'Founding Engineer',
    period: 'Feb 2026 – May 2026',
    location: 'New York, NY',
    description:
      'Built a full-stack platform for dermatologic note generation and image analysis. Surveyed a 40+ person derm clinic to shape product direction and drive clinical adoption.',
  },
  {
    company: 'Biokind — Reproductive Health Access Project',
    role: 'Data Engineer',
    period: 'Jan 2026 – May 2026',
    location: 'New York, NY',
    description:
      'Built ETL pipelines normalizing 35k+ donor and health records. Reduced manual data processing time by 60% with a FastAPI orchestration system.',
    link: 'https://www.biokind.org/',
  },
  {
    company: 'Pulse Foundry',
    role: 'Software Engineer',
    period: 'Dec 2025 – May 2026',
    location: 'New York, NY',
    description:
      'Built an automated newsletter pipeline with semantic ranking and scheduled workers, serving 3,000+ subscribers. Developed a React dashboard for editors to review and tune the pipeline in real time.',
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
