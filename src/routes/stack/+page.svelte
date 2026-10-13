<script lang="ts">
  import StackIcon from '#lib/components/StackIcon.svelte'
  import { stack } from '#lib/data/stack.ts'
</script>

<main
  class="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0"
>
  <h1 class="sr-only">Stack</h1>
  {#each stack as group, i (group.label)}
    <section class="animate-fade-up-1" style:animation-delay="{i * 80}ms">
      <div class="flex flex-col gap-4 md:flex-row md:gap-24">
        <h2 class="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">{group.label}</h2>
        <ul class="w-full gap-x-10 text-base leading-relaxed text-textSecondary sm:columns-2">
          {#each group.items as item (item.name)}
            <li class="group flex break-inside-avoid items-center gap-3 py-1">
              <StackIcon
                icon={item.icon}
                class="h-4 w-4 shrink-0 text-textSecondary/60 transition-colors group-hover:text-accent"
              />
              <span class="transition-colors group-hover:text-textPrimary">{item.name}</span>
            </li>
          {/each}
        </ul>
      </div>
    </section>
  {/each}
</main>
