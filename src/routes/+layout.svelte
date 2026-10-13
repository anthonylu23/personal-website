<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import { injectSpeedInsights } from '@vercel/speed-insights'
  import { dev } from '$app/env'
  import { page } from '$app/state'
  import Navbar from '#lib/components/Navbar.svelte'
  import { syncTheme } from '#lib/theme.svelte.ts'
  import type { LayoutProps } from './$types'

  let { children }: LayoutProps = $props()

  // Photo project pages have their own back nav; unknown ids fall through to
  // the error page, which keeps the navbar so visitors aren't stranded.
  const hideNavbar = $derived(page.route.id === '/photography/[id]' && !page.error)

  // The SvelteKit wrapper in @vercel/speed-insights targets Kit 1/2, so use
  // the framework-agnostic entry and report the route pattern ourselves.
  let speedInsights: ReturnType<typeof injectSpeedInsights> = null

  onMount(() => {
    syncTheme()
    if (!dev) speedInsights = injectSpeedInsights({ framework: 'sveltekit', route: page.route.id })
  })

  $effect(() => {
    speedInsights?.setRoute(page.route.id)
  })
</script>

<div class="min-h-screen bg-base">
  {#if !hideNavbar}
    <Navbar />
  {/if}
  {@render children()}
</div>
