<script lang="ts">
  $effect(() => {
    const goHome = (e: KeyboardEvent) => {
      if (e.key === "h") {
        window.location.href = "/";
      }
    };

    window.addEventListener('keypress', goHome);
    return () => window.removeEventListener('keypress', goHome);
  });
</script>
<main class="min-h-dvh bg-primary-900 text-primary-300 flex flex-col items-center justify-center gap">
  <h1 class="text-white text-2xl">Oops!</h1>
  <p>Looks like you've found a glitch in the matrix.</p>
  <a href="/" class="bg-primary-700 hover:bg-primary-500 transition-colors duration-100 text-white px-4 py-2 mt-4 rounded">
    Go Home
    <kbd class="text-sm text-primary-300">(h)</kbd>
  </a>
</main>
