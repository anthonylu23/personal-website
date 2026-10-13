# GitHub activity grid

A past-year GitHub contribution grid on the home page, below the heading and intro line. A "Right now, I'm focused on" list sits under the grid.

## Files

| File | Purpose |
| --- | --- |
| `src/components/GitHubActivity.astro` | The card and placeholder grid, plus the script that fetches data and fills in the cells |
| `src/lib/contributions.ts` | Fetching, response validation, week grouping, tooltip text |
| `src/lib/contributions.test.ts` | Vitest tests for the logic above |
| `src/pages/index.astro` | Renders `<GitHubActivity username={GITHUB_USERNAME} />` |

## Data source

The browser fetches
`https://github-contributions-api.jogruber.de/v4/<username>?y=last` on page load.
It's a free, public third-party service that scrapes GitHub's contribution graph,
so no token or server code is needed. The response is validated in
`parseContributionsResponse`; anything unexpected is treated as an error.

The site is a multi-page app, so each visit to Home fetches once. The in-memory
cache in `fetchContributions` only dedupes requests within a single page load.

## Behavior

- **Layout:** 7 rows (Sunday at the top) × one column per week, about 53 columns.
  The first and last weeks are padded with empty cells so columns line up with
  weekdays.
- **Sizing:** columns are `minmax(10px, 1fr)`, so the grid fills the content width
  on desktop. On narrow screens it scrolls horizontally (scrollbar hidden) and
  starts scrolled to the most recent week.
- **Colors:** GitHub's levels 0–4 map to the site accent at increasing opacity
  (`bg-accent/30`, `/55`, `/80`, full), with level 0 as `bg-textSecondary/10`. The
  colors follow the light/dark theme.
- **Tooltips:** each cell has a native `title`, e.g. "3 contributions on Oct 12, 2025".
  The grid has an `aria-label` with the yearly total.
- **Loading:** the HTML ships a pulsing placeholder grid of the same size, to
  avoid layout shift.
- **Errors:** if the request fails or the response is malformed, the script
  removes the card.
- **No JavaScript:** the card is hidden by a `<noscript>` style in `Base.astro`.

## Changing it

- **Username:** `GITHUB_USERNAME` in `src/pages/index.astro` (also used for the GitHub icon link).
- **Colors:** `LEVEL_CLASSES` in the script in `src/components/GitHubActivity.astro`.
- **Card border:** `border-textSecondary/35` (the `border` token is too low-contrast against the light-mode background).

## Next steps

- If the third-party API proves unreliable, replace `fetchContributions` with a
  Vercel function (`/api/github-contributions`) that queries GitHub's GraphQL
  `contributionsCollection` with a `GITHUB_TOKEN` and caches the result. The
  component and `toWeeks` wouldn't need to change.
- Alternatively, fetch at build time and render the grid as static HTML. That
  removes the client request but freezes the data until the next deploy.
- Optional: month labels above the grid, or a caption with the yearly total.
