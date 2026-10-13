// Fades `[data-reveal]` elements in the first time they scroll into view.
// Each starts with `opacity-0 translate-y-4` and a transition in its markup.

export function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (targets.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-4')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 },
  )

  targets.forEach((el) => observer.observe(el))
}
