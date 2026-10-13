# Navbar

The site navbar is `src/components/GlassNavbar.tsx`. It is rendered by the shared
`Layout` in `src/App.tsx` on every page except valid photo project pages
(`/photography/:id`), which have their own back navigation.

Nav items are defined in `navItems` in `src/components/Navbar.tsx`:
About (`/about`), Projects (`/projects`), and Photography (`/photography`).
Writing (`/blog`) appears only when `BLOG_ENABLED` and `WRITING_NAV_VISIBLE`
are both true in `src/config/features.ts`.

## Effects

| Effect | Status | Where |
| --- | --- | --- |
| Solid page-colored background (`bg-base`) on the fixed header | Active while glass is disabled | `GlassNavbar.tsx` |
| Glass background on scroll | **Disabled** (`NAVBAR_GLASS_ON_SCROLL = false`) | `GlassNavbar.tsx`, `GlassSurface.tsx`, `GlassSurface.css` |
| Padding expansion on scroll (`px-0` → `px-6`) | **Disabled** (same flag) | `GlassNavbar.tsx` |
| Hover/focus underline that grows from the center | Active | `.nav-underline` in `src/index.css` |
| Diagonal wipe when toggling the theme | Active (falls back to an instant switch without View Transitions or with reduced motion) | `src/hooks/useTheme.ts`, `src/index.css` |
| Focus styles: no focus rings anywhere in the navbar (they were clipped by `overflow: hidden`). Keyboard focus shows the underline on text links and the accent color on icon buttons and mobile menu items | Active | `GlassNavbar.tsx` (`ICON_BUTTON_CLASS`) |
| No focus on mouse/touch click: every navbar control calls `preventPointerFocus` on `mousedown`, so a click never leaves a lingering focus style. Keyboard and screen-reader focus is unchanged | Active | `GlassNavbar.tsx` |
| Mobile dropdown menu | Active, no open/close animation | `GlassNavbar.tsx` |

### Glass on scroll (disabled)

When enabled, the navbar is transparent at the top of the page and turns into a
frosted glass pill once the page scrolls past 50px: the background, shadow,
border, and backdrop blur fade in over 0.3s and the horizontal padding grows
from `px-0` to `px-6`. Chromium uses an SVG displacement filter ("liquid
glass"); Safari, Firefox, low-core devices, and reduced-motion users get a CSS
blur fallback.

It is turned off with `NAVBAR_GLASS_ON_SCROLL` in `src/config/features.ts`. All
of the code is still in place. With the flag off:

- The navbar always uses the transparent state (`glass-navbar--transparent`)
  and `px-0`.
- The scroll listener and the `nav-glass` event listener are not registered.
- The fixed `<header>` gets a solid `bg-base` background (the page color, so it
  follows the theme) so content scrolling underneath doesn't show through the
  nav links. Re-enabling the flag removes it and restores the glass behavior.

To turn it back on, set `NAVBAR_GLASS_ON_SCROLL = true`.

## Next steps

- Decide whether to keep the glass effect disabled permanently. If so, consider
  removing `GlassSurface` from the navbar and the related CSS.
- The `nav-glass` window event (which forces the glass state) has no
  dispatchers anywhere in the codebase; remove it or reuse it.
- Logo clicks still use the old `handleHashNav("#home")` scroll-to-section
  helper; nav items are all routes now, so this could be simplified to a plain
  link to `/`.
- `src/components/Navbar.tsx` is a legacy navbar that is no longer rendered; it
  is only imported for `navItems`.
