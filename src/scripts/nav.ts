// Navbar behavior: the mobile menu toggle, and no lingering focus style after a
// mouse or touch click on a navbar control. Keyboard focus is unaffected.

export function initNav() {
  const header = document.querySelector<HTMLElement>('[data-navbar]')
  if (!header) return

  header.addEventListener('mousedown', (event) => {
    if ((event.target as Element).closest('a, button')) event.preventDefault()
  })

  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const menu = header.querySelector<HTMLElement>('[data-menu]')
  if (!toggle || !menu) return

  const setOpen = (open: boolean) => {
    menu.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
  }

  toggle.addEventListener('click', () => setOpen(menu.hidden))

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !header.contains(event.target as Node)) setOpen(false)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false)
      toggle.focus()
    }
  })
}
