<script lang="ts">
import { cn } from '$lib'
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

type ButtonProps = Omit<HTMLButtonAttributes, 'type'> & {
  hasIcon?: boolean
  fullWidth?: boolean
  type: Exclude<HTMLButtonAttributes['type'], undefined | null>
}

const { children, type, fullWidth = false, class: className, ...props }: ButtonProps = $props()
</script>

<button
  type={type}
  class={cn(
    "border border-primary-700 bg-primary-700 transition-colors duration-200 ease-in-out text-primary-200 px-2 py-1 rounded-md flex items-center gap-2",
    "hover:bg-primary-600 focus:bg-primary-500",
    {
      "flex gap-2 items-center": props.hasIcon,
      "w-full flex items-center justify-center": fullWidth,
    },
    className,
  )}
  {...props}
>
  {@render children?.()}
</button>
