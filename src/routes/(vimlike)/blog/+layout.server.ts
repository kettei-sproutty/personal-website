export const load = async () => {
  const articles = [
    { slug: '1', title: 'hello-world', updated: Date.now() },
    { slug: '2', title: 'hello-world-2', updated: Date.now() - 1000 * 60 * 60 * 24 },
  ]

  return {
    status: 200,
    data: {
      articles,
    },
  }
}

export const prerender = true
