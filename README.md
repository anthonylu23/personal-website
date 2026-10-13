# Personal Website

A portfolio showcasing photography work, software/data projects, and writing. Built with SvelteKit; every page is prerendered to static HTML.

## Key Features

- **Photography Collections** - Curated images from locations including NYC, Tokyo, Kyoto, Yosemite, and more
- **Project Showcase** - Featured software engineering work with stack details
- **GitHub Activity** - Past-year contribution grid on the home page, themed to the site accent
- **Writing** - Markdown blog posts rendered to HTML at build time

## Tech Stack

- **Framework**: SvelteKit 3 + Svelte 5 (runes) with TypeScript
- **Build Tool**: Vite 8
- **Deployment**: Vercel via `@sveltejs/adapter-vercel`, all routes prerendered
- **Styling**: TailwindCSS 3 with custom theme variables
- **Markdown**: `marked` (GitHub-flavored), rendered on the server only
- **Icons**: `@lucide/svelte`, plus [Simple Icons](https://simpleicons.org) on the Stack page

## Development

Requires Node 22.17 or newer.

- `npm run dev` - optimize photos, then start the dev server
- `npm run build` - optimize photos, then build and prerender
- `npm run preview` - serve the production build locally
- `npm run check` - type-check Svelte and TypeScript files
- `npm test` - run unit tests (Vitest)

Photos live in `src/data/photos/<folder>/`. `scripts/optimize-images.js` writes WebP versions to `static/photos/` (gitignored) and regenerates `src/lib/data/photo-manifest.json`.

## Site Structure

Routes live in `src/routes/`.

- **Home** (`/`): Intro, GitHub activity grid, current focus areas, resume link, and contact links
- **About** (`/about`): Bio and experience timeline
- **Stack** (`/stack`): Languages, infrastructure, frameworks, ML, tools, and photo gear (data and icons in `src/lib/data/stack.ts`)
- **Photography** (`/photography`): Cover image for each of the 19 collections
- **Photography Project** (`/photography/[id]`): Full-resolution gallery for each location
- **Projects** (`/projects`): Engineering projects with descriptions and links (first few shown, expandable)
- **Writing** (`/blog`, `/blog/[slug]`): Posts from `src/content/blog/*.md`; set `draft: true` in front matter to hide one
- **Not found / errors**: `src/routes/+error.svelte` renders the shared minimal view in `src/lib/components/StatusPage.svelte`

## Docs

- [GitHub activity grid](docs/github-activity.md): data source, behavior, and how to change it
- [Stack page](docs/stack.md): data, icons, fallbacks, and adding items
- [Navbar](docs/navbar.md): nav items and effects
