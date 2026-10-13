<script lang="ts">
  import { ExternalLink, FileText, type LucideIcon } from '@lucide/svelte'
  import GithubIcon from '#lib/components/icons/GithubIcon.svelte'
  import type { Project, ProjectLinkType } from '#lib/data/content.ts'

  let { project }: { project: Project } = $props()

  const LINK_META: Record<ProjectLinkType, { icon: LucideIcon; label: string }> = {
    github: { icon: GithubIcon, label: 'GitHub' },
    demo: { icon: ExternalLink, label: 'Demo' },
    paper: { icon: FileText, label: 'Paper' },
  }

  const links = $derived(project.links ?? [])
</script>

<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
  <span class="font-medium text-textPrimary/90">{project.title}</span>
  {#if links.length > 0}
    <div class="flex flex-wrap gap-2">
      {#each links as link (`${link.type}-${link.href}`)}
        {@const meta = LINK_META[link.type]}
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          class="focus-ring group inline-flex items-center gap-1.5 rounded-full border border-border/40 px-2.5 py-1 text-xs text-textSecondary transition hover:border-accent/40 hover:text-accent"
        >
          <meta.icon class="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
          {link.label ?? meta.label}
        </a>
      {/each}
    </div>
  {/if}
</div>
<p class="text-sm leading-relaxed text-textSecondary">
  {project.description}
</p>
