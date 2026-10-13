# GitHub activity grid

A past-year GitHub contribution grid on the home page, below the heading and intro line. A "Right now, I'm focused on" list sits under the grid.

## Files

| File | Purpose |
| --- | --- |
| `src/components/GitHubActivity.tsx` | The grid UI (card, cells, loading and error states) |
| `src/lib/contributions.ts` | Fetching, response validation, week grouping, tooltip text |
| `src/lib/contributions.test.ts` | Vitest tests for the logic above |
| `src/pages/Home.tsx` | Renders `<GitHubActivity username={GITHUB_USERNAME} />` |

## Data source

The browser fetches
`https://github-contributions-api.jogruber.de/v4/<username>?y=last` on page load.
It's a free, public third-party service that scrapes GitHub's contribution graph,
so no token or server code is needed. The response is validated in
`parseContributionsResponse`; anything unexpected is treated as an error.

The request is cached in memory per username, so navigating away from and back to
Home doesn't refetch. A failed request isn't cached, so the next mount retries.

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
- **Loading:** a pulsing placeholder grid of the same size, to avoid layout shift.
- **Errors:** if the request fails or the response is malformed, the component
  renders nothing.

## Changing it

- **Username:** `GITHUB_USERNAME` in `src/pages/Home.tsx` (also used for the GitHub icon link).
- **Colors:** `LEVEL_CLASSES` in `src/components/GitHubActivity.tsx`.
- **Card border:** `border-textSecondary/35` (the `border` token is too low-contrast against the light-mode background).

## Next steps

- If the third-party API proves unreliable, replace `fetchContributions` with a
  Vercel function (`/api/github-contributions`) that queries GitHub's GraphQL
  `contributionsCollection` with a `GITHUB_TOKEN` and caches the result. The
  component and `toWeeks` wouldn't need to change.
- Optional: month labels above the grid, or a caption with the yearly total.
