// @ts-check
import { defineConfig } from 'astro/config'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  // Emit `about.html` rather than `about/index.html`; vercel.json's
  // `cleanUrls` serves it at `/about`.
  build: {
    format: 'file',
  },
  // Astro 7 defaults to 'jsx', which strips whitespace between inline
  // elements. The markup was ported from React and expects HTML whitespace.
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    // Code blocks keep the plain `.prose-custom pre` styling from the React site.
    syntaxHighlight: false,
    // Render quotes and dashes exactly as written, like react-markdown did.
    smartypants: false,
  },
})
