<script lang="ts">
  // Lucide 1.x dropped brand icons; this is the outline LinkedIn icon from lucide@0.553.0 (ISC).
  import { Icon, type LucideProps } from '@lucide/svelte'

  let props: LucideProps = $props()
</script>

<Icon
  {...props}
  iconNode={[
    ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
    ['rect', { width: '4', height: '12', x: '2', y: '9' }],
    ['circle', { cx: '4', cy: '4', r: '2' }],
  ]}
/>
