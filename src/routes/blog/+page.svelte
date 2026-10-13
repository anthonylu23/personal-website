<script lang="ts">
  import SectionHeading from '#lib/components/SectionHeading.svelte'
  import { formatCalendarDate } from '#lib/dates.ts'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<main
  class="mx-auto flex max-w-4xl flex-col gap-28 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <section class="scroll-mt-24">
    <SectionHeading title="Writing" />
    <div class="border-t border-border/40">
      <div class="divide-y divide-border/30">
        {#each data.posts as post (post.slug)}
          <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
            <a
              href="/blog/{post.slug}"
              class="text-base font-medium text-textPrimary/90 transition hover:text-accent"
            >
              {post.title}
            </a>
            <div class="text-sm leading-relaxed text-textSecondary md:text-right">
              <p class="text-xs text-textSecondary/70">{formatCalendarDate(post.date)}</p>
            </div>
          </div>
        {/each}
      </div>
      {#if data.posts.length === 0}
        <p class="py-8 text-center text-sm text-textSecondary/60">No posts yet. Check back soon!</p>
      {/if}
      <div class="flex items-center justify-center gap-4 py-4">
        <span class="h-px w-32 bg-border/60 sm:w-56 md:w-80"></span>
        <span class="h-1 w-1 rounded-full bg-border/60"></span>
        <span class="h-px w-32 bg-border/60 sm:w-56 md:w-80"></span>
      </div>
    </div>
  </section>
</main>
