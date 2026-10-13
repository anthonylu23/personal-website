// Theme toggle for every `[data-theme-toggle]` button. The initial theme is set
// by the inline script in Base.astro before first paint; this only handles
// clicks and keeps each button's label in sync.

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

function syncButtons(theme: Theme) {
  const dark = theme === 'dark'
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode')
    button.setAttribute('aria-pressed', String(dark))
  })
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore storage errors (private mode, disabled, etc.)
  }
  syncButtons(theme)
}

function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  // Diagonal wipe via the View Transitions API; see global.css.
  if (document.startViewTransition) {
    document.startViewTransition(() => applyTheme(next))
  } else {
    applyTheme(next)
  }
}

export function initTheme() {
  syncButtons(currentTheme())
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', toggleTheme)
  })
}
