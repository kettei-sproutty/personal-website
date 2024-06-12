<script lang="ts">
import { cn } from '$lib'
import type { HTMLAttributes } from 'svelte/elements'

type BlogSectionProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  isAside?: boolean
  id: string
}

const { label, isAside = false, id, ...props }: BlogSectionProps = $props()
</script>

{#if isAside}
  <aside id={id} class={cn("blog-section", props.class)}>
    <h2 class="blog-section__title">{label}</h2>
    <div class="h-2"></div>
    {@render props.children?.()}
  </aside>
{:else}
  <section id={id} class={cn("blog-section", props.class)}>
    <h2 class="blog-section__title">{label}</h2>
    <div class="h-2"></div>
    {@render props.children?.()}
  </section>
{/if}

<style lang="postcss">
  .blog-section {
    @apply border border-primary-500 rounded-md relative;
  }

  .blog-section__title {
    @apply text-sm font-sans bg-primary-900 inline-block -top-3 absolute left-2 px-2 font-bold;
  }
</style>
