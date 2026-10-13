export type DescriptionLink = { text: string; href: string }
export type DescriptionPart = { text: string; href?: string }

/**
 * Splits `description` into plain and linked parts. Each link's `text` is
 * matched once, in order; links whose text isn't found are skipped.
 */
export function splitDescription(
  description: string,
  links: DescriptionLink[] = [],
): DescriptionPart[] {
  const parts: DescriptionPart[] = []
  let remaining = description
  for (const { text, href } of links) {
    const idx = remaining.indexOf(text)
    if (idx === -1) continue
    if (idx > 0) parts.push({ text: remaining.slice(0, idx) })
    parts.push({ text, href })
    remaining = remaining.slice(idx + text.length)
  }
  if (remaining) parts.push({ text: remaining })
  return parts
}
