import type { Attachment } from 'svelte/attachments'

/**
 * Fades an element in the first time it scrolls into view. The element should
 * start with `opacity-0 translate-y-4` and a transition.
 */
export const reveal: Attachment<HTMLElement> = (node) => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-4')
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(node)
  return () => observer.disconnect()
}
