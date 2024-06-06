<script lang="ts">
  type ResumeAboutProps = {
    about: string[];
  };

  let { about }: ResumeAboutProps = $props();
</script>

<section id="resume-about">
  <h2 class="font-bold text-primary-800 mb-1">About me</h2>
  <div class="text-sm text-primary-500 ml-4 font-thin">
    {#each about as paragraph}
      <p class="leading-">{paragraph}</p>
    {/each}
  </div>
</section>
