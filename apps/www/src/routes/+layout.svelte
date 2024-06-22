<script>
import '../app.css'
let description =
  'Alessio Marchi is a Software Developer based in Rome, Italy, passionate about TypeScript, and Rust.'
</script>

<svelte:head>
  <title>Alessio Marchi</title>
  <meta name="description" content={description} />
  <meta
    name="keywords"
    content="Alessio Marchi, alessiomarchi, alessiomarchi.dev"
  />
  <meta name="author" content="Alessio Marchi" />
  <meta name="robots" content="index, follow" />
  <meta name="og:type" content="website" />
  <meta name="og:title" content="Alessio Marchi" />
  <meta name="og:url" content="https://alessiomarchi.dev" />
  <meta name="og:image" content="https://alessiomarchi.dev/favicon.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@alessiom97" />
  <meta name="twitter:title" content="Alessio Marchi" />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://alessiomarchi.dev/favicon.svg" />
</svelte:head>

<slot />
