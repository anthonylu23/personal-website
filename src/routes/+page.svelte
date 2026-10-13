<script lang="ts">
  import { ArrowDownRight, ChevronLeft, ChevronRight } from '@lucide/svelte'
  import { asset } from '$app/paths'
  import GitHubActivity from '#lib/components/GitHubActivity.svelte'
  import GithubIcon from '#lib/components/icons/GithubIcon.svelte'
  import { contactMethods } from '#lib/data/content.ts'

  const GITHUB_USERNAME = 'anthonylu23'

  let scrollEl = $state<HTMLDivElement>()
  let canScrollLeft = $state(false)
  let canScrollRight = $state(false)

  const checkScroll = () => {
    if (!scrollEl) return
    canScrollLeft = scrollEl.scrollLeft > 0
    canScrollRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 1
  }

  $effect(() => {
    const el = scrollEl
    if (!el) return
    checkScroll()
    const ro = new ResizeObserver(checkScroll)
    ro.observe(el)
    el.addEventListener('scroll', checkScroll, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', checkScroll)
    }
  })

  const scroll = (dir: 'left' | 'right') => {
    scrollEl?.scrollBy({ left: dir === 'left' ? -80 : 80, behavior: 'smooth' })
  }
</script>

<main
  class="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <section id="home" class="flex scroll-mt-24 flex-col justify-center">
    <div class="space-y-8">
      <div class="animate-fade-up-1 space-y-6">
        <h1 class="text-balance text-3xl font-semibold text-textPrimary md:text-4xl">
          Hi, I'm Anthony
        </h1>
        <p class="text-base text-textSecondary">
          Undergrad at NYU studying Computer Science, Data Science, and Math. Aspiring engineer and
          developer.
        </p>
        <GitHubActivity username={GITHUB_USERNAME} />
        <div class="space-y-3 text-base text-textSecondary">
          <p>Right now, I'm focused on:</p>
          <ul class="list-disc space-y-1 pl-6 marker:text-textSecondary/50">
            <li>
              <span class="text-textPrimary/90">MLSys:</span> Inference projects, CUDA, GPUs.
            </li>
            <li>
              <span class="text-textPrimary/90">Post-training:</span> RL methods, environments, evals.
            </li>
            <li>Reading about AI safety, alignment, and scaling.</li>
          </ul>
        </div>
      </div>
      <div class="animate-fade-up-2 flex items-center gap-5">
        <a
          href={asset('Resume_AnthonyLu_NYC.pdf')}
          target="_blank"
          rel="noopener noreferrer"
          class="focus-ring group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-textInverse shadow-glow transition hover:bg-accentHover"
        >
          Resume
          <ArrowDownRight
            class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </a>
        <button
          onclick={() => scroll('left')}
          class={[
            'focus-ring shrink-0 rounded text-textSecondary/50 transition-opacity duration-300 hover:text-accent',
            canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0',
          ]}
          aria-label="Scroll left"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <div class="relative min-w-0">
          <div
            class={[
              'pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-base to-transparent transition-opacity duration-300',
              canScrollLeft ? 'opacity-100' : 'opacity-0',
            ]}
          ></div>
          <div
            class={[
              'pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-base to-transparent transition-opacity duration-300',
              canScrollRight ? 'opacity-100' : 'opacity-0',
            ]}
          ></div>
          <div bind:this={scrollEl} class="scrollbar-hide flex items-center gap-5 overflow-x-auto">
            <a
              href="https://github.com/{GITHUB_USERNAME}"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-ring shrink-0 rounded-full text-textSecondary transition hover:text-accent"
              aria-label="GitHub"
            >
              <GithubIcon class="h-6 w-6" />
            </a>
            {#each contactMethods as method (method.label)}
              {@const isExternal = method.href.startsWith('http')}
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                class="focus-ring shrink-0 rounded-full text-textSecondary transition hover:text-accent"
                aria-label={method.label}
              >
                <method.icon class="h-6 w-6" />
              </a>
            {/each}
          </div>
        </div>
        <button
          onclick={() => scroll('right')}
          class={[
            'focus-ring shrink-0 rounded text-textSecondary/50 transition-opacity duration-300 hover:text-accent',
            canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0',
          ]}
          aria-label="Scroll right"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </section>
</main>
