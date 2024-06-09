<script lang="ts">
let { data } = $props()
</script>

<svelte:head>
  <title>{data.article.metadata.title} | Alessio Marchi</title>
  <meta name="description" content={data.article.metadata.description} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="text-xs">
  {@html data.article.content}
</div>
