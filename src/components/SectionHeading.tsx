import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

const SectionHeading = ({ eyebrow, title, description, children }: SectionHeadingProps) => (
  <div className="mb-10 max-w-2xl">
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-semibold text-textPrimary text-balance lg:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-lg text-textSecondary">{description}</p>}
    {children}
  </div>
)

export default SectionHeading
