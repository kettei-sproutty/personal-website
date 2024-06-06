<script lang="ts" context="module">
import type { Component } from 'svelte'

export type ResumeContactType = {
  name: 'email' | 'phone' | (string & {})
  value: string
  Icon?: Component
};
</script>

<script lang="ts">
type ResumeContactProps = {
  contacts: ResumeContactType[];
};

const { contacts }: ResumeContactProps = $props();
</script>

<section id="resume-contacts" class="bg-primary-700 py-2">
  <h2 class="sr-only">contacts</h2>
  <ul class="flex gap-4 items-center">
    {#each contacts as { name, value, Icon }}
      <li class="first:border-none border-l pl-4">
        <a href={value} class="flex items-center gap-1 text-sm">
          <span>
            {#if Icon}
              <Icon className="size-4" />
            {/if}
          </span>
          <span class="text-sm">{name}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>
