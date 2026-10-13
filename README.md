# Personal Website

A modern portfolio showcasing photography work, software/data projects, and explorations. Built with React and featuring an immersive 3D photo gallery experience.

## Key Features

- **Immersive 3D Photo Gallery** - WebGL-powered infinite scrolling gallery with cloth folding effects and blur transitions, inspired by [this](https://v0.app/templates/3-d-gallery-photography-template-JUFK37Esjlj) v0 template˜
- **Photography Collections** - Curated images from locations including NYC, Tokyo, Kyoto, Yosemite, and more
- **Project Showcase** - Featured software engineering work with stack details
- **GitHub Activity** - Past-year contribution grid on the home page, themed to the site accent
- **Glassmorphism UI** - Modern glass-effect components from [ReactBits](reactbits.dev)

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Styling**: TailwindCSS 3 with custom theme variables
- **Routing**: React Router DOM

## Development

- `npm run dev` - start the dev server
- `npm run build` - typecheck and build
- `npm test` - run unit tests (Vitest)

## Site Structure

- **Home** (`/`): Intro, GitHub activity grid, current focus areas, resume link, and contact links
- **About** (`/about`): Bio and experience timeline
- **Stack** (`/stack`): Languages, infrastructure, frameworks, ML, tools, and photo gear (data and icons in `src/data/stack.ts`; brand logos from [Simple Icons](https://simpleicons.org), Lucide icons where no brand logo exists)
- **Photography**: 3D WebGL gallery with 19 curated photo collections
- **Photography Project**: Full-resolution photo galleries for each location
- **Projects** (`/projects`): Engineering projects with descriptions and tech stacks (first few shown, expandable)
- **Not found / errors**: Unknown routes, missing photo projects/blog posts, and render errors all share one minimal view (`src/components/StatusPage.tsx`)

## Docs

- [GitHub activity grid](docs/github-activity.md): data source, behavior, and how to change it
- [Stack page](docs/stack.md): data, icons, fallbacks, and adding items
- [Navbar](docs/navbar.md): nav items, effects, and the `NAVBAR_GLASS_ON_SCROLL` flag (glass-on-scroll is currently disabled)
