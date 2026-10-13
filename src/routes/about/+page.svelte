<script lang="ts">
  import { ChevronDown, ChevronUp } from '@lucide/svelte'
  import { reveal } from '#lib/actions/reveal.ts'
  import ExperienceRow from '#lib/components/ExperienceRow.svelte'
  import { experiences } from '#lib/data/content.ts'

  const COLLAPSED_EXP = 2

  let expanded = $state(false)

  const peekExp = experiences[COLLAPSED_EXP]
  const hiddenExps = experiences.slice(COLLAPSED_EXP + 1)
</script>

<main
  class="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <section id="about" class="animate-fade-up-1 scroll-mt-24">
    <div class="flex flex-col gap-6 md:flex-row md:gap-24">
      <h2 class="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">About</h2>
      <div class="space-y-6 text-base leading-relaxed text-textSecondary">
        <p>
          I'm originally from Austin, and currently based in New York City. In my free time, I take
          <a href="/photography" class="underline underline-offset-2 transition hover:text-accent"
            >pictures</a
          >
          (mostly analog), play classical violin, and watch racing and basketball.
        </p>
        <p>
          I'm always looking to learn new things and explore different ideas. These days, I've been
          exploring systems programming and researching multi-agent post-training methods.
        </p>
      </div>
    </div>
  </section>

  <hr class="mx-auto w-[45%] border-textSecondary/30" />

  <section id="experience" class="scroll-mt-24">
    <div class="flex flex-col gap-6 md:flex-row md:gap-24">
      <h2
        {@attach reveal}
        class="translate-y-4 text-lg font-semibold text-textPrimary opacity-0 transition-all duration-500 ease-out md:w-40 md:shrink-0"
      >
        Experience
      </h2>
      <div class="relative w-full pl-6">
        <span
          {@attach reveal}
          class="pointer-events-none absolute bottom-0 left-0 top-[11px] w-px bg-gradient-to-b from-border/40 via-border/40 to-transparent opacity-0 transition-opacity duration-500 ease-out"
        ></span>
        {#each experiences.slice(0, COLLAPSED_EXP) as exp, i (exp.company)}
          <div
            {@attach reveal}
            class="relative translate-y-4 pb-8 opacity-0 transition-all duration-500 ease-out"
            style:transition-delay="{i * 80}ms"
          >
            <ExperienceRow {exp} filledDot={i === 0} />
          </div>
        {/each}

        {#if peekExp}
          <!-- Peek item: clipped to show company + role only -->
          <div
            class="relative -ml-8 overflow-hidden pl-8"
            style:max-height={expanded ? '300px' : '44px'}
            style:transition="max-height 500ms ease-out"
          >
            <div
              {@attach reveal}
              class="relative translate-y-4 pb-8 opacity-0 transition-all duration-500 ease-out"
              style:transition-delay="{COLLAPSED_EXP * 80}ms"
            >
              <ExperienceRow exp={peekExp} />
            </div>
            <div
              class={[
                'pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300',
                expanded ? 'opacity-0' : 'opacity-100',
              ]}
            ></div>
          </div>

          <!-- Remaining hidden items -->
          {#if hiddenExps.length > 0}
            <div
              class="grid"
              style:grid-template-rows={expanded ? '1fr' : '0fr'}
              style:transition="grid-template-rows 500ms ease-out"
            >
              <div class="-ml-8 min-h-0 overflow-hidden pl-8">
                {#each hiddenExps as exp, i (exp.company)}
                  <div
                    class={[
                      'relative pb-8 transition-all duration-500 ease-out last:pb-0',
                      expanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    ]}
                    style:transition-delay={expanded ? `${(i + 1) * 80}ms` : '0ms'}
                  >
                    <ExperienceRow {exp} />
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <button
            onclick={() => (expanded = !expanded)}
            class="focus-ring mt-2 flex items-center gap-1 rounded text-sm text-textSecondary/60 transition hover:text-accent"
          >
            {#if expanded}
              Show less <ChevronUp class="h-3.5 w-3.5" />
            {:else}
              {experiences.length - COLLAPSED_EXP} more <ChevronDown class="h-3.5 w-3.5" />
            {/if}
          </button>
        {/if}
      </div>
    </div>
  </section>
</main>
