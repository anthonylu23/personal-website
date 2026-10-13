<script lang="ts">
  import { ChevronDown, ChevronUp } from '@lucide/svelte'
  import { reveal } from '#lib/actions/reveal.ts'
  import ProjectRow from '#lib/components/ProjectRow.svelte'
  import { projects } from '#lib/data/content.ts'

  const COLLAPSED_PROJ = 3

  let expanded = $state(false)

  const peekProj = projects[COLLAPSED_PROJ]
  const hiddenProjs = projects.slice(COLLAPSED_PROJ + 1)
</script>

<main
  class="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <section id="projects" class="scroll-mt-24">
    <div class="flex flex-col gap-6 md:flex-row md:gap-24">
      <h2 class="animate-fade-up-1 text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
        Projects
      </h2>
      <div class="w-full">
        {#each projects.slice(0, COLLAPSED_PROJ) as project, i (project.title)}
          <div
            {@attach reveal}
            class="relative flex translate-y-4 flex-col gap-2 opacity-0 transition-all duration-500 ease-out {i >
            0
              ? 'border-t border-border/30 py-4'
              : 'pb-4'}"
            style:transition-delay="{i * 80}ms"
          >
            <ProjectRow {project} />
          </div>
        {/each}

        {#if peekProj}
          <!-- Peek item: clipped to show title only -->
          <div
            class="relative overflow-hidden border-t border-border/30"
            style:max-height={expanded ? '360px' : '52px'}
            style:transition="max-height 500ms ease-out"
          >
            <div
              {@attach reveal}
              class="relative flex translate-y-4 flex-col gap-2 py-4 opacity-0 transition-all duration-500 ease-out"
              style:transition-delay="{COLLAPSED_PROJ * 80}ms"
            >
              <ProjectRow project={peekProj} />
            </div>
            <div
              class={[
                'pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300',
                expanded ? 'opacity-0' : 'opacity-100',
              ]}
            ></div>
          </div>

          <!-- Remaining hidden items -->
          {#if hiddenProjs.length > 0}
            <div
              class="grid"
              style:grid-template-rows={expanded ? '1fr' : '0fr'}
              style:transition="grid-template-rows 500ms ease-out"
            >
              <div class="min-h-0 overflow-hidden">
                {#each hiddenProjs as project, i (project.title)}
                  <div
                    class={[
                      'flex flex-col gap-2 border-t border-border/30 py-4 transition-all duration-500 ease-out',
                      expanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    ]}
                    style:transition-delay={expanded ? `${(i + 1) * 80}ms` : '0ms'}
                  >
                    <ProjectRow {project} />
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
              {projects.length - COLLAPSED_PROJ} more <ChevronDown class="h-3.5 w-3.5" />
            {/if}
          </button>
        {/if}
      </div>
    </div>
  </section>
</main>
