export type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'theme'

const applyTheme = (value: Theme) => {
  const root = document.documentElement
  root.dataset.theme = value
  root.style.colorScheme = value
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // Ignore storage errors (private mode, disabled, etc.)
  }
}

/**
 * The inline script in app.html sets `data-theme` before first paint.
 * Prerendered HTML always assumes dark, so call `sync()` after hydration.
 */
export const theme = $state<{ current: Theme }>({ current: 'dark' })

export function syncTheme() {
  theme.current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function toggleTheme() {
  const update = () => {
    theme.current = theme.current === 'dark' ? 'light' : 'dark'
    applyTheme(theme.current)
  }

  if (document.startViewTransition) {
    document.startViewTransition(update)
  } else {
    update()
  }
}
