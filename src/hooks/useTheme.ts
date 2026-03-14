import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "theme";

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return getStoredTheme() ?? "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors (private mode, disabled, etc.)
    }
  }, [theme]);

  const toggleTheme = () => {
    const update = () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    if (document.startViewTransition) {
      document.startViewTransition(update);
    } else {
      update();
    }
  };

  return { theme, setTheme, toggleTheme };
};
