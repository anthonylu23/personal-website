// "N more / Show less" lists. Each `[data-expandable]` root is a Tailwind
// `group`; its children style themselves with `group-data-[expanded=true]:`
// variants, so this only flips the attribute. Collapsed items are `inert` so
// keyboard users can't tab into links they can't see.

export function initExpandables() {
  document.querySelectorAll<HTMLElement>('[data-expandable]').forEach((root) => {
    const toggle = root.querySelector<HTMLButtonElement>('[data-expand-toggle]')
    if (!toggle) return
    const hidden = root.querySelectorAll<HTMLElement>('[data-expand-hidden]')

    toggle.addEventListener('click', () => {
      const expanded = root.dataset.expanded !== 'true'
      root.dataset.expanded = String(expanded)
      toggle.setAttribute('aria-expanded', String(expanded))
      hidden.forEach((el) => {
        el.inert = !expanded
      })
    })
  })
}
