# Navbar

The site navbar is `src/components/Navbar.astro`. `src/layouts/Base.astro`
renders it on every page except photo collection pages
(`/photography/:id`), which pass `showNav={false}` and have their own back link.

It is a plain fixed header with the page background color. The glass effect
from the React site was removed in the Astro port.

## Items

Nav items are defined in `navItems` at the top of `Navbar.astro`: About
(`/about`), Projects (`/projects`), Stack (`/stack`), and Photography
(`/photography`). Writing (`/blog`) appears only when `BLOG_ENABLED` and
`WRITING_NAV_VISIBLE` are both true in `src/config/features.ts`.

## Behavior

| Behavior | Where |
| --- | --- |
| Hover/focus underline that grows from the center | `.nav-underline` in `src/styles/global.css` |
| Theme toggle (sun in dark mode, moon in light mode) with a diagonal wipe. Falls back to an instant switch without View Transitions or with reduced motion | `src/scripts/theme.ts`, `src/styles/global.css` |
| Stored theme applied before first paint, so there's no flash | inline script in `src/layouts/Base.astro` |
| Mobile dropdown menu. Closes on Escape or a click outside | `src/scripts/nav.ts` |
| No lingering focus style after a mouse or touch click. Keyboard focus shows the underline on links and the accent color on icon buttons | `src/scripts/nav.ts` |

## Height

The header is a fixed height: 1rem top padding plus a 3.5rem row, plus the
top safe-area inset. `--nav-height` in `src/styles/global.css` holds that value,
and the photography page uses it to start content below the navbar. Change both
together.
