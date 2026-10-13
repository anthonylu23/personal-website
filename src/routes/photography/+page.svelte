<script lang="ts">
  import { onMount } from 'svelte'
  import { gallery } from '#lib/data/gallery.ts'

  let navOffset = $state(0)
  let pageReady = $state(false)

  onMount(() => {
    const frame = requestAnimationFrame(() => (pageReady = true))

    const header = document.querySelector('header')
    const updateOffset = () => {
      if (header) navOffset = Math.ceil(header.getBoundingClientRect().height)
    }
    updateOffset()
    window.addEventListener('resize', updateOffset)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updateOffset)
    }
  })
</script>

<main class="min-h-screen">
  <section
    class="relative z-10 bg-base px-4 pb-24 md:px-8"
    style:padding-top={navOffset ? `${navOffset}px` : undefined}
  >
    <div class="mx-auto flex max-w-4xl flex-col gap-16">
      {#each gallery as item, index (item.id)}
        <article
          class={[
            'flex min-h-[70vh] w-full items-center transition-all duration-700 ease-out md:min-h-[85vh]',
            pageReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          ]}
          style:min-height={index === 0 && navOffset ? `calc(100vh - ${navOffset}px)` : undefined}
          style:transition-delay="{Math.min(index * 80, 240)}ms"
        >
          <div class="relative flex w-full items-center justify-center">
            <div class="group relative inline-flex max-w-full overflow-hidden bg-border/20">
              <img
                src={item.image}
                alt="{item.title} cover"
                loading="lazy"
                class={[
                  'max-h-[85vh] w-auto max-w-full object-contain transition-all duration-1000 ease-out',
                  pageReady ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0',
                ]}
              />
              <div
                class="pointer-events-none absolute inset-0 z-10 bg-black/55 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
              ></div>
              <a
                href="/photography/{item.id}"
                class="nav-underline pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer font-serif text-2xl tracking-tight text-white opacity-0 mix-blend-exclusion drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 md:text-4xl"
                aria-label="{item.title} gallery"
              >
                {item.title}
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>
</main>
