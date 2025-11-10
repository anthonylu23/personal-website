import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Code2, Database, Github, Layers, Linkedin, Mail, Phone, Server } from 'lucide-react'

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
]

export const gallery: GalleryItem[] = [
  {
    title: 'Glacial Light',
    location: 'Vík, Iceland',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Landscape', 'Long Exposure'],
  },
  {
    title: 'Neon Metropolis',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    tags: ['City', 'Night'],
  },
  {
    title: 'Sunrise Hues',
    location: 'Cappadocia, Türkiye',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    tags: ['Travel', 'Color'],
  },
  {
    title: 'Alpine Stillness',
    location: 'Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1500534319217-1e19b174c57c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Minimal', 'Moody'],
  },
  {
    title: 'Golden Hour Lines',
    location: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Architecture', 'Street'],
  },
  {
    title: 'Desert Bloom',
    location: 'Abu Dhabi, UAE',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Portrait', 'Editorial'],
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
      'Introduction to Deep Learning & LLMs',
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
]
