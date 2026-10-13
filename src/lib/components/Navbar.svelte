<script lang="ts">
  import { Menu, Moon, Sun, X } from '@lucide/svelte'
  import { afterNavigate } from '$app/navigation'
  import { navItems } from '#lib/nav.ts'
  import { theme, toggleTheme } from '#lib/theme.svelte.ts'

  let isOpen = $state(false)

  afterNavigate(() => {
    isOpen = false
  })

  // Stops mouse/touch clicks from focusing navbar controls, so no focus style
  // lingers after a click. Keyboard and screen-reader focus is unaffected.
  const preventPointerFocus = (event: MouseEvent) => event.preventDefault()

  // No focus ring; keyboard focus is shown by the accent icon color
  // (or the underline on text links).
  const ICON_BUTTON_CLASS =
    'inline-flex items-center justify-center rounded-full p-2 text-textPrimary transition hover:text-accent focus-visible:text-accent focus-visible:outline-none'

  const themeLabel = $derived(
    theme.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  )
</script>

{#snippet themeButton()}
  <button
    type="button"
    class={ICON_BUTTON_CLASS}
    onmousedown={preventPointerFocus}
    onclick={toggleTheme}
    aria-label={themeLabel}
    aria-pressed={theme.current === 'dark'}
  >
    <!-- Both icons render so prerendered HTML matches the stored theme before hydration. -->
    <Sun class="theme-dark-only h-4 w-4" />
    <Moon class="theme-light-only h-4 w-4" />
  </button>
{/snippet}

<header
  class="fixed inset-x-0 top-0 z-50 bg-base px-4 pt-4"
  style:padding-top="calc(1rem + env(safe-area-inset-top, 0px))"
  style:padding-left="calc(1rem + env(safe-area-inset-left, 0px))"
  style:padding-right="calc(1rem + env(safe-area-inset-right, 0px))"
>
  <div class="relative mx-auto w-full max-w-4xl">
    <div class="flex w-full items-center gap-4 py-3">
      <a
        href="/"
        class="nav-underline truncate rounded text-base font-semibold tracking-tight text-textPrimary focus-visible:outline-none"
        onmousedown={preventPointerFocus}
      >
        luanthony.xyz
      </a>
      <div class="ml-auto hidden items-center gap-3 md:flex">
        <nav class="flex items-center gap-6">
          {#each navItems as item (item.label)}
            <a
              href={item.href}
              class="nav-underline rounded text-sm font-medium text-textPrimary/80 focus-visible:outline-none"
              onmousedown={preventPointerFocus}
            >
              {item.label}
            </a>
          {/each}
        </nav>
        {@render themeButton()}
      </div>
      <div class="ml-auto flex items-center gap-2 md:hidden">
        {@render themeButton()}
        <button
          type="button"
          class={ICON_BUTTON_CLASS}
          onmousedown={preventPointerFocus}
          onclick={() => (isOpen = !isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {#if isOpen}
            <X class="h-5 w-5" />
          {:else}
            <Menu class="h-5 w-5" />
          {/if}
        </button>
      </div>
    </div>
    {#if isOpen}
      <div
        class="absolute right-0 top-[calc(100%+8px)] z-10 w-fit rounded-2xl border border-border/20 bg-surface/80 px-1 py-1 backdrop-blur-lg md:hidden"
      >
        <nav class="flex flex-col">
          {#each navItems as item (item.label)}
            <a
              href={item.href}
              onmousedown={preventPointerFocus}
              class="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-textPrimary/80 transition hover:bg-surface/60 hover:text-accent focus-visible:bg-surface/60 focus-visible:text-accent focus-visible:outline-none"
            >
              {item.label}
            </a>
          {/each}
        </nav>
      </div>
    {/if}
  </div>
</header>
