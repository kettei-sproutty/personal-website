<script lang="ts" context="module">
  export type WorkHistoryProjectType = {
    description: string,
    stack: string[],
  };

   export type WorkHistoryType = {
    company: string,
    role: string,
    projects: WorkHistoryProjectType[],
    period: string,
  };
</script>

<script lang="ts">
  type WorkHistoryProps = {
    workHistory: WorkHistoryType[]
  }

  const { workHistory }: WorkHistoryProps = $props();
</script>

<section id="resume-work-history">
  <h2 class="text-sm text-primary-800 font-bold mb-1">Work History</h2>
  <ul class="flex flex-col gap-2">
    {#each workHistory as { company, role, projects, period }}
      <li class="text-primary-700 list-disc ml-4">
        <div class="flex flex-row items-center gap-2">
          <h3 class="font-semibold inline text-sm">{company}</h3>
          <span>/</span>
          <span class="text-primary-600 text-xs">{role}</span>
          <span>/</span>
          <span class="text-primary-500 text-xs font-thin">{period}</span>
        </div>
        <div class="flex flex-col gap-2">
          <ul class="flex flex-col gap-1 ml-4 list-decimal text-xs">
          {#each projects as { description, stack }}
              <li>
                <p class="text-primary-500 text-sm pb-1">{description}</p>
                <ul class="flex flex-row gap-1">
                  {#each stack as tech}
                    <li class="bg-primary-800 text-primary-100 text-xs border border-primary-200 px-2 py-1 rounded-lg">{tech}</li>
                  {/each}
                </ul>
              </li>
              {/each}
            </ul>
        </div>
      </li>
    {/each}
  </ul>
</section>
