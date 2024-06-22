<script lang="ts">
import { cn } from '$lib/cn'
import type { SVGAttributes } from 'svelte/elements'

const { class: className, ...props }: SVGAttributes<EventTarget> = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cn("size-4", className)}
  {...props}
>
  <title>Git Icon</title>
  <line x1="6" x2="6" y1="3" y2="15"></line>
  <circle cx="18" cy="6" r="3"></circle>
  <circle cx="6" cy="18" r="3"></circle>
  <path d="M18 9a9 9 0 0 1-9 9"></path>
</svg>
