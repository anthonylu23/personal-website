<script lang="ts">
  import type { PathIcon, StackIcon } from '#lib/data/stack.ts'

  /** Monochrome (currentColor) icon for a stack item: a brand logo path or a Lucide fallback. */
  let { icon, class: className }: { icon: StackIcon; class?: string } = $props()

  const isPathIcon = (value: StackIcon): value is PathIcon => 'path' in value
</script>

{#if isPathIcon(icon)}
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" class={className}>
    <path d={icon.path} />
  </svg>
{:else}
  {@const Icon = icon}
  <Icon aria-hidden="true" strokeWidth={1.75} class={className} />
{/if}
