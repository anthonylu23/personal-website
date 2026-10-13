<script lang="ts">
  import type { Experience } from '#lib/data/content.ts'

  let { exp, filledDot = false }: { exp: Experience; filledDot?: boolean } = $props()

  const isExternal = $derived(Boolean(exp.link?.startsWith('http')))

  /** Splits the description so each `descriptionLinks` phrase renders as a link. */
  const parts = $derived.by(() => {
    const result: Array<{ text: string; href?: string }> = []
    let remaining = exp.description
    for (const { text, href } of exp.descriptionLinks ?? []) {
      const idx = remaining.indexOf(text)
      if (idx === -1) continue
      if (idx > 0) result.push({ text: remaining.slice(0, idx) })
      result.push({ text, href })
      remaining = remaining.slice(idx + text.length)
    }
    if (remaining) result.push({ text: remaining })
    return result
  })
</script>

<span
  class="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent {filledDot
    ? 'bg-accent'
    : 'bg-base'}"
></span>
<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
  {#if exp.link}
    <a
      href={exp.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      class="font-medium text-textPrimary/90 transition hover:text-accent"
    >
      {exp.company}
    </a>
  {:else}
    <p class="font-medium text-textPrimary/90">{exp.company}</p>
  {/if}
  <p class="text-xs text-textSecondary/70">{exp.location}</p>
</div>
<div class="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
  <p class="text-sm text-textSecondary">{exp.role}</p>
  <p class="text-xs tracking-wide text-textSecondary/70">{exp.period}</p>
</div>
<p class="mt-1.5 text-sm leading-relaxed text-textSecondary">
  {#each parts as part, i (i)}{#if part.href}<a
        href={part.href}
        target="_blank"
        rel="noreferrer"
        class="underline underline-offset-2 transition hover:text-accent">{part.text}</a
      >{:else}{part.text}{/if}{/each}
</p>
