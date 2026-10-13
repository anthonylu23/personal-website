<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const project = $derived(data.project)
  let pageReady = $state(false)

  // Replay the entrance animation whenever the project changes.
  $effect(() => {
    void project.id
    pageReady = false
    const frame = requestAnimationFrame(() => (pageReady = true))
    return () => cancelAnimationFrame(frame)
  })
</script>

<main class="min-h-screen bg-base px-6 pb-20 pt-24 md:px-10">
  <div
    class="fixed inset-x-0 top-0 z-50 px-6 pt-4 md:px-10"
    style:padding-top="calc(1rem + env(safe-area-inset-top, 0px))"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
      <a
        href="/photography"
        class="text-2xl font-medium text-textPrimary/80 hover:text-accent"
        aria-label="Back"
      >
        ←
      </a>
      <p class="text-right text-sm font-medium text-textPrimary/60">{project.title}</p>
    </div>
  </div>
  <section class="mx-auto flex max-w-6xl flex-col gap-10">
    <div class="grid grid-cols-1 gap-10">
      {#each project.galleryImages as src, index (`${project.id}-${index}`)}
        <figure
          class={[
            'w-full transition-all duration-700 ease-out',
            pageReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          ]}
          style:transition-delay="{Math.min(index * 60, 180)}ms"
        >
          <img
            {src}
            alt="{project.title} photo {index + 1}"
            loading="lazy"
            class={[
              'mx-auto h-[88vh] w-auto max-w-full object-contain transition-all duration-1000 ease-out',
              pageReady ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0',
            ]}
          />
        </figure>
      {/each}
    </div>
  </section>
</main>
