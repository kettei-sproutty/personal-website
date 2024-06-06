<script lang="ts">
import { cn } from "$lib";
  import type { Snippet } from "svelte";

type TextDividerProps = {
  className?: string,
  padding?: boolean,
  children: Snippet
}

let { className = "", padding = true, children }: TextDividerProps = $props();
</script>

<div class={cn("relative flex items-center w-full", { "py-5": padding })}>
  <div class="flex-grow border-t border-primary-400"></div>
  <span class={cn("flex-shrink mx-4 text-primary-400", className)}>
    {@render children()}
  </span>
  <div class="flex-grow border-t border-primary-400"></div>
</div>
