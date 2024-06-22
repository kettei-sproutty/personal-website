<script lang="ts">
import { cn } from '$lib/cn'
import { getIconFromName } from '$lib/utils'
import type { SVGAttributes } from 'svelte/elements'

type GeneralIconProps = SVGAttributes<EventTarget> & {
  iconName: string
}

const { class: className, iconName, ...props }: GeneralIconProps = $props()

const Icon = getIconFromName(iconName)
</script>

{#if Icon}
  <Icon class={cn("fill-current", className)} {...props} />
{/if}
