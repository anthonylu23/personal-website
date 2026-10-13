<script lang="ts">
  import { onMount, tick } from 'svelte'
  import {
    describeDay,
    fetchContributions,
    toWeeks,
    type ContributionCalendar,
    type ContributionLevel,
    type ContributionWeek,
  } from '#lib/contributions.ts'

  /** Past-year GitHub contribution grid. Renders nothing if the data can't be loaded. */
  let { username }: { username: string } = $props()

  const LEVEL_CLASSES: Record<ContributionLevel, string> = {
    0: 'bg-textSecondary/10',
    1: 'bg-accent/30',
    2: 'bg-accent/55',
    3: 'bg-accent/80',
    4: 'bg-accent',
  }

  // Placeholder grid shown while loading, sized like a year so nothing shifts.
  const PLACEHOLDER_WEEKS: ContributionWeek[] = Array.from({ length: 53 }, () =>
    Array<null>(7).fill(null),
  )

  let scrollEl = $state<HTMLDivElement>()
  let calendar = $state<ContributionCalendar | null>(null)
  let status = $state<'loading' | 'ready' | 'error'>('loading')

  onMount(() => {
    let active = true
    fetchContributions(username)
      .then(async (data) => {
        if (!active) return
        calendar = data
        status = 'ready'
        // On narrow screens the grid scrolls horizontally; start at the most recent week.
        await tick()
        if (scrollEl) scrollEl.scrollLeft = scrollEl.scrollWidth
      })
      .catch(() => {
        if (active) status = 'error'
      })
    return () => {
      active = false
    }
  })

  const weeks = $derived(calendar ? toWeeks(calendar.days) : PLACEHOLDER_WEEKS)
  const label = $derived(
    calendar
      ? `${calendar.total.toLocaleString('en-US')} GitHub contributions in the last year`
      : 'Loading GitHub contributions',
  )
</script>

{#if status !== 'error'}
  <div class="rounded-xl border border-textSecondary/35 p-3">
    <div bind:this={scrollEl} class="scrollbar-hide overflow-x-auto">
      <div
        role="img"
        aria-label={label}
        class="grid grid-flow-col gap-[3px]"
        style:grid-template-rows="repeat(7, auto)"
        style:grid-template-columns="repeat({weeks.length}, minmax(10px, 1fr))"
      >
        {#each weeks as week, w (w)}
          {#each week as day, d (d)}
            {#if day}
              <div
                title={describeDay(day)}
                class="aspect-square rounded-[2px] {LEVEL_CLASSES[day.level]}"
              ></div>
            {:else}
              <div
                class="aspect-square rounded-[2px] {calendar
                  ? ''
                  : `${LEVEL_CLASSES[0]} animate-pulse`}"
              ></div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
{/if}
