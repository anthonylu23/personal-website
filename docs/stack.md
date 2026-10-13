# Stack page

`/stack` lists languages, infrastructure, frameworks, ML, tools, and photo gear,
each with a small monochrome icon.

## Files

| File | Purpose |
| --- | --- |
| `src/lib/data/stack.ts` | Groups, items, and each item's icon |
| `src/lib/components/StackIcon.svelte` | Renders an item's icon in `currentColor` |
| `src/routes/stack/+page.svelte` | Page layout (group label left, two-column list right) |
| `src/lib/data/stack.test.ts` | Checks labels/items are unique and every item has an icon |

## Icons

Brand logos come from [`simple-icons`](https://simpleicons.org) (CC0; brands keep
their trademarks). Import only the icons you use (`import { siPython } from
'simple-icons'`) so the rest are tree-shaken.

Simple Icons has no logo for some items (several brands were removed at the
owner's request), so these use a Lucide icon instead:

| Item | Fallback |
| --- | --- |
| SQL | `Database` |
| ObjectScript | `Braces` |
| AWS | `Cloud` |
| Ilford HP5+, Portra 400 | `Film` |

Java uses the OpenJDK logo and HF Transformers uses the Hugging Face logo.

Codex uses the OpenAI logo, which current Simple Icons no longer ships. Its path
is copied from `simple-icons@13.21.0` (CC0) into `openaiIcon` in
`src/lib/data/stack.ts`. Any custom logo works the same way: a `PathIcon`
(`{ title, path }`) with a single 24×24 SVG path.

Icons are `text-textSecondary/60` and turn the accent color on row hover; the item
name brightens to `text-textPrimary`.

## Bundle size

The logos used total about 57 kB (25 kB gzipped). Each Simple Icons object also
includes its full SVG string and metadata. To keep that out of the main bundle,
the stack data lives in its own module that only the Stack route imports.
SvelteKit splits code per route, so the logos download only when someone opens `/stack`.

## Adding an item

1. Find the icon at simpleicons.org; the export is `si` + the slug, e.g. `siKubernetes`.
2. Import it in `src/lib/data/stack.ts` and add `{ name, icon }` to the group.
3. If there's no brand logo, add a custom `PathIcon` (e.g. from an older Simple
   Icons release) or use a Lucide icon from `@lucide/svelte`.

## Next steps

- `src/lib/data/content.ts` still has an older, unused `skills` list (with
  coursework). Remove it or merge anything worth keeping into this page.
- Ideas from the design discussion not yet built: short notes per item, linking
  items to the projects that use them, and photo samples for the Photo group.
