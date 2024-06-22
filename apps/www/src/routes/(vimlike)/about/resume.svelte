<script lang="ts">
import GeneralIcon from '$components/icons/general-icon.svelte'
import TextDivider from '$components/text-divider.svelte'
import { getIconFromName } from '$lib/utils'
import type { ResumeType } from './+page.server'

type ResumeProps = {
  resume: ResumeType
}

let { resume }: ResumeProps = $props()

const [firstLetter, lastLetter] = resume.name
  .split(' ')
  .reduce<string[]>((acc, name) => acc.concat(name?.[0] || ''), [])
</script>

<div class="bg-primary-100 mx-auto">
  <div class="px-6 max-w-a4 bg-primary-100">
    <section id="resume-header">
      <div class="flex items-center w-full gap-5">
        <div
          class="text-base leading-none py-3 bg-primary-800 font-medium px-3"
        >
          <div class="initial text-center text-2xl pb-1">{firstLetter}</div>
          <div class="text-center text-2xl initial">{lastLetter}</div>
        </div>
        <h1 class="text-4xl font-semibold text-primary-800 w-full flex-grow">
          {resume.name}
        </h1>
      </div>
      <h2 class="text-xl text-primary-500 text-right">{resume.role}</h2>
    </section>
    <section id="resume-contacts" class="bg-primary-700 py-2">
      <h2 class="sr-only">contacts</h2>
      <ul class="flex gap-4 items-center">
        {#each resume.contacts as { name, value }}
          <li class="first:border-none border-l pl-4">
            <a href={value} class="flex items-center gap-1 text-sm">
              <span>
                {#if getIconFromName(name)}
                  <GeneralIcon class="size-4" iconName={name} />
                {/if}
              </span>
              <span class="text-sm">{name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </section>
    <div class="grid grid-cols-12 pt-7 gap-3">
      <div class="col-span-3">
        <aside
          id="resume-sidebar"
          class="w-full bg-primary-800 border-primary-300 flex flex-col gap-4 p-2 min-h-full"
        >
          {#each Object.entries(resume.sidebarInfos) as [category, items]}
            <div class="gap-2">
              <TextDivider
                padding={false}
                className="text-sm pb-2 first-letter:uppercase text-primary-200"
                >{category}</TextDivider
              >
              <ul class="pl-3">
                {#each items as item}
                  <li class="text-xs text-primary-200 list-disc">{item}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </aside>
      </div>
      <div class="col-span-9 flex flex-col gap-2">
        <section id="resume-about">
          <h2 class="font-bold text-primary-800 mb-1">About me</h2>
          <div class="text-sm text-primary-500 ml-4 font-thin">
            {#each resume.about as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        </section>
        <section id="resume-work-history">
          <h2 class="text-sm text-primary-800 font-bold mb-1">Work History</h2>
          <ul class="flex flex-col gap-2">
            {#each resume.workHistory as { company, role, projects, period }}
              <li class="text-primary-700 list-disc ml-4">
                <div class="flex flex-row items-center gap-2">
                  <h3 class="font-semibold inline text-sm">{company}</h3>
                  <span>/</span>
                  <span class="text-primary-600 text-xs">{role}</span>
                  <span>/</span>
                  <span class="text-primary-500 text-xs font-thin"
                    >{period}</span
                  >
                </div>
                <div class="flex flex-col gap-2">
                  <ul class="flex flex-col gap-1 ml-4 list-decimal text-xs">
                    {#each projects as { description, stack }}
                      <li>
                        <p class="text-primary-500 text-sm pb-1">
                          {description}
                        </p>
                        <ul class="flex flex-row gap-1">
                          {#each stack as tech}
                            <li
                              class="bg-primary-800 text-primary-100 text-xs border border-primary-200 px-2 py-1 rounded-lg"
                            >
                              {tech}
                            </li>
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
      </div>
    </div>
  </div>
</div>
