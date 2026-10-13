import { BLOG_ENABLED, WRITING_NAV_VISIBLE } from '#lib/config/features.ts'

export type NavItem = { label: string; href: string }

export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Stack', href: '/stack' },
  ...(BLOG_ENABLED && WRITING_NAV_VISIBLE ? [{ label: 'Writing', href: '/blog' }] : []),
  { label: 'Photography', href: '/photography' },
]
