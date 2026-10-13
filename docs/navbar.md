# Navbar

The site navbar is `src/lib/components/Navbar.svelte`. It is rendered by the root
layout in `src/routes/+layout.svelte` on every page except valid photo project
pages (`/photography/[id]`), which have their own back navigation. Unknown photo
ids render the error page, which keeps the navbar.

Nav items are defined in `navItems` in `src/lib/nav.ts`:
About (`/about`), Projects (`/projects`), Stack (`/stack`), and Photography
(`/photography`).
Writing (`/blog`) appears only when `BLOG_ENABLED` and `WRITING_NAV_VISIBLE`
are both true in `src/lib/config/features.ts`.

## Effects

| Effect | Status | Where |
| --- | --- | --- |
| Solid page-colored background (`bg-base`) on the fixed header | Active | `Navbar.svelte` |
| Hover/focus underline that grows from the center | Active | `.nav-underline` in `src/app.css` |
| Diagonal wipe when toggling the theme | Active (falls back to an instant switch without View Transitions or with reduced motion) | `src/lib/theme.svelte.ts`, `src/app.css` |
| Theme icon correct before hydration: both icons are rendered and CSS hides the wrong one based on `data-theme` | Active | `Navbar.svelte`, `.theme-dark-only` / `.theme-light-only` in `src/app.css` |
| Focus styles: no focus rings in the navbar. Keyboard focus shows the underline on text links and the accent color on icon buttons and mobile menu items | Active | `Navbar.svelte` (`ICON_BUTTON_CLASS`) |
| No focus on mouse/touch click: every navbar control calls `preventPointerFocus` on `mousedown`. Keyboard and screen-reader focus is unchanged | Active | `Navbar.svelte` |
| Mobile dropdown menu, closed automatically after each navigation | Active, no open/close animation | `Navbar.svelte` |

## Theme

`src/app.html` has an inline script that reads `localStorage.theme` and sets
`data-theme` on `<html>` before first paint. Prerendered HTML always assumes
dark, so the root layout calls `syncTheme()` on mount to copy the real value
into the shared `theme` state.

## Not ported from the React version

The React site had a "liquid glass" navbar (`GlassSurface`) that turned on when
the page scrolled. It was disabled behind `NAVBAR_GLASS_ON_SCROLL = false`, so
this port renders the disabled state directly and leaves the glass code out.
The unused `GlassFooter` component was also not ported.
