<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    title,
    description,
    children,
  }: { title: string; description?: string; children?: Snippet } = $props()
</script>

<div class="mb-10 max-w-2xl">
  <h2 class="mt-3 text-balance text-3xl font-semibold text-textPrimary lg:text-4xl">{title}</h2>
  {#if description}
    <p class="mt-4 text-lg text-textSecondary">{description}</p>
  {/if}
  {@render children?.()}
</div>
