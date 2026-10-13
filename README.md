# Personal Website

A portfolio showcasing photography, software/data projects, and writing. Built
with Astro as a fully static site that ships only a few small scripts.

## Key Features

- **Photography Collections** - Curated images from locations including NYC, Tokyo, Kyoto, Yosemite, and more
- **Project Showcase** - Featured software engineering work, first few shown with an expandable list
- **GitHub Activity** - Past-year contribution grid on the home page, themed to the site accent
- **Light and dark themes** - Stored per visitor, with a diagonal wipe when switching

## Tech Stack

- **Framework**: Astro 7 (static output) with TypeScript
- **Styling**: TailwindCSS 3 (via PostCSS) with custom theme variables
- **Content**: Markdown blog posts in an Astro content collection
- **Icons**: [Lucide](https://lucide.dev) (`@lucide/astro`) and [Simple Icons](https://simpleicons.org)
- **Images**: `scripts/optimize-images.js` (sharp) converts photos to WebP before dev and build
- **Hosting**: Vercel, with Speed Insights

There is no UI framework on the client. Interactive pieces are plain `<script>`
tags in the components that need them; shared logic lives in `src/scripts/`.

## Development

Requires Node 22.12 or newer (see `.nvmrc`).

- `npm run dev` - optimize photos, then start the dev server
- `npm run build` - optimize photos, then build to `dist/`
- `npm run preview` - serve the built site locally
- `npm run check` - type-check `.astro` and `.ts` files
- `npm test` - run unit tests (Vitest)

## Site Structure

| Route | Page | Notes |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Intro, GitHub activity grid, focus areas, resume and contact links |
| `/about` | `src/pages/about.astro` | Bio and experience timeline (expandable) |
| `/projects` | `src/pages/projects.astro` | Projects with links (expandable) |
| `/stack` | `src/pages/stack.astro` | Tools and gear with monochrome icons; see [docs/stack.md](docs/stack.md) |
| `/photography` | `src/pages/photography/index.astro` | One cover per collection |
| `/photography/:id` | `src/pages/photography/[id].astro` | Full collection; no navbar, its own back link |
| `/blog`, `/blog/:slug` | `src/pages/blog/` | Posts from `src/content/blog/*.md`; gated by `BLOG_ENABLED` |
| anything else | `src/pages/404.astro` | Minimal not-found view |

Content lives in `src/data/` (projects, experience, contacts, stack, gallery) and
`src/content/blog/`. Feature flags are in `src/config/features.ts`.

## Photos

Originals go in `src/data/photos/<folder>/`. The optimize script writes
`public/photos/` (gitignored) and regenerates `src/data/photo-manifest.json`.
Add a collection by adding its folder and an entry in `src/data/gallery.ts`.

## Docs

- [GitHub activity grid](docs/github-activity.md): data source, behavior, and how to change it
- [Stack page](docs/stack.md): data, icons, fallbacks, and adding items
- [Navbar](docs/navbar.md): nav items, theme toggle, and mobile menu
