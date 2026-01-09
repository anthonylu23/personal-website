import type { ReactNode } from 'react'

type SectionHeadingProps = {
  title: string
  description?: string
  children?: ReactNode
}

const SectionHeading = ({ title, description, children }: SectionHeadingProps) => (
  <div className="mb-10 max-w-2xl">
    <h2 className="mt-3 text-3xl font-semibold text-textPrimary text-balance lg:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-lg text-textSecondary">{description}</p>}
    {children}
  </div>
)

export default SectionHeading
