import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Code2, Database, Github, Instagram, Layers, Linkedin, Mail, Server, Twitter } from 'lucide-react'

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
  icon: LucideIcon
}

export const projects: Project[] = [
  {
    title: 'Context Grabber',
    description:
      'Menu bar app + CLI that captures browser tabs and desktop apps into structured markdown for LLM workflows.',
    stack: ['Swift', 'Go', 'TypeScript', 'Bun'],
    link: 'https://github.com/anthonylu23/context_grabber',
  },
  {
    title: 'Vision Transformer for Genotype Classification',
    description:
      '3D ViT for genotype classification from LFP spectrograms.',
    stack: ['Python', 'PyTorch', 'BigQuery', 'GCS', 'Vertex AI'],
    link: 'https://github.com/anthonylu23/neural-vit',
  },
  {
    title: 'AdaHealth - Hackathon Winner',
    description:
      'AI voice companion for elder check-ins and caregiver safety insights.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    link: 'https://github.com/lljw9999/hackathon',
  },
  {
    title: 'Openbook-CLI',
    description:
      'CLI companion to chat with your notes, PDFs, and research.',
    stack: ['TypeScript', 'Python', 'LangChain', 'Ollama', 'ChromaDB'],
    link: 'https://github.com/anthonylu23/openbook',
  },
  {
    title: 'Scout',
    description:
      'AI field guide for photo viewpoints, timing, and camera settings.',
    stack: ['React', 'JavaScript', 'Python', 'FastAPI', 'Google GenAI', 'Vercel'],
    link: 'https://github.com/anthonylu23/scout',
  },
  {
    title: 'F1 Prediction Dashboard',
    description:
      'Streamlit dashboard modeling race outcomes and betting odds.',
    stack: ['Machine Learning', 'Python', 'XGBoost', 'NumPy/Pandas', 'Streamlit', 'AWS', 'Docker'],
    link: 'https://github.com/anthonylu23/f1_prediction_dashboard',
  },
  {
    title: 'Photo Search',
    description:
      'Local-first semantic search across your photography library.',
    stack: ['RAG', 'Python', 'ChromaDB', 'OpenCLIP', 'LangChain'],
    link: 'https://github.com/anthonylu23/photo_search',
  },
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
    icon: Twitter,
  },
]
