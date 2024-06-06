<script lang="ts">
  import type { ResumeType } from "./resume.svelte";

  type ResumeHeaderProps = {
    resume: ResumeType;
  };

  const { resume }: ResumeHeaderProps = $props();
  const [firstLetter, lastLetter] = resume.name
    .split(" ")
    .reduce((acc, name) => acc.concat(name[0]), [] as string[]);
</script>

<section id="resume-header">
  <div class="flex items-center w-full gap-5">
    <div class="text-base leading-none py-3 bg-primary-800 font-medium px-3">
      <div class="initial text-center text-2xl pb-1">{firstLetter}</div>
      <div class="text-center text-2xl initial">{lastLetter}</div>
    </div>
    <h1 class="text-4xl font-semibold text-primary-800 w-full flex-grow">
      {resume.name}
    </h1>
  </div>
  <h2 class="text-xl text-primary-400 text-right">{resume.role}</h2>
</section>
