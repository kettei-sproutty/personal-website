<script lang="ts">
import { cn } from '$lib/cn'
import type { HTMLInputAttributes } from 'svelte/elements'

type InputProps = HTMLInputAttributes & {
  label: string
  error: string | null
  fullWidth?: boolean
  showLabel?: boolean
}

const {
  label,
  type,
  name,
  required = false,
  error = null,
  showLabel = true,
  fullWidth = false,
  class: className,
  ...props
}: InputProps = $props()
</script>

<div class={cn("flex flex-col gap-1", { "w-full": fullWidth })}>
  <label
    for={name}
    class={cn("text-primary-300 first-letter:uppercase", {
      "sr-only": !showLabel,
    })}>{label}</label
  >
  <input
    id={name}
    {type}
    {name}
    class={cn(
      "p-2 rounded-md bg-primary-900 text-primary-300 focus:outline-none focus:ring focus:ring-primary-400",
      "border border-primary-500",
      className,
    )}
    {required}
    {...props}
  />
  <span
    class={cn("h-2 text-xs font-semibold", error ? "visible" : "invisible")}
  >
    {error}
  </span>
</div>
