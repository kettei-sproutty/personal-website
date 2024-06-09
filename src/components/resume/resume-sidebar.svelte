<script lang="ts" context="module">
export type ResumeSidebarType = Record<string, string[]>
</script>

<script lang="ts">
  import TextDivider from "$components/text-divider.svelte";

  type ResumeSidebarProps = {
    sidebarInfos: ResumeSidebarType;
  };

  const { sidebarInfos }: ResumeSidebarProps = $props();
</script>

<aside id="resume-sidebar" class="w-full bg-primary-800 border-primary-300 flex flex-col gap-4 p-2 min-h-full">
  {#each Object.keys(sidebarInfos) as category}
    <div class="gap-2">
      <TextDivider padding={false} className="text-sm pb-2 first-letter:uppercase text-primary-200">{category}</TextDivider>
      <ul class="pl-3">
        {#each sidebarInfos[category] as item}
          <li class="text-xs text-primary-200 list-disc">{item}</li>
        {/each}
      </ul>
    </div>
  {/each}
</aside>
