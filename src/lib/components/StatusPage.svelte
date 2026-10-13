<script lang="ts">
  /** Shared minimal view for not-found and error states. */
  let { code, message }: { code?: string; message: string } = $props()
</script>

<main class="flex min-h-screen items-center justify-center px-4">
  <p class="text-sm text-textSecondary/60">
    {#if code}
      <span class="text-textSecondary">{code}</span>
      <span class="mx-3 text-textSecondary/30">|</span>
    {/if}
    {message}
  </p>
</main>
