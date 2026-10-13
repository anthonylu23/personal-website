<script lang="ts">
  import { page } from '$app/state'
  import StatusPage from '#lib/components/StatusPage.svelte'
</script>

{#if page.status === 404}
  <StatusPage code="404" message="Page not found" />
{:else}
  <StatusPage message="Something went wrong" />
{/if}
