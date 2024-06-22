<script lang="ts">
import { cn } from '$lib/cn'
import type { SVGAttributes } from 'svelte/elements'

const { class: className, ...props }: SVGAttributes<EventTarget> = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class={cn("size-6", className)}
  {...props}
>
  <title>Left Icon</title>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  />
</svg>
