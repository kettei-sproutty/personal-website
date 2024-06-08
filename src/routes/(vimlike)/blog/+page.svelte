<svelte:head>
  <title>Blog | Alessio Marchi</title>
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation'

$effect(() => {
  goto('/')
})
</script>


