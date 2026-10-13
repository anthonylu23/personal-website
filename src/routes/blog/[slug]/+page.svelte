<script lang="ts">
  import { formatCalendarDate } from '#lib/dates.ts'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<main
  class="mx-auto flex max-w-3xl flex-col px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <a href="/blog" class="mb-8 text-xl text-textSecondary transition hover:text-accent" aria-label="Back to blog">
    &larr;
  </a>
  <header class="mb-10">
    <h1 class="text-balance text-3xl font-semibold text-textPrimary md:text-4xl">{data.post.title}</h1>
    <p class="mt-3 text-sm text-textSecondary/70">{formatCalendarDate(data.post.date)}</p>
  </header>
  <article class="prose-custom">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- rendered from repo-authored markdown -->
    {@html data.post.html}
  </article>
</main>
