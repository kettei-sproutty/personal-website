export const load = async (context) => {
  const slug = context.params.article

  const articles = [
    { slug: '1', title: 'hello-world', updated: Date.now(), content: 'hello world first' },
    {
      slug: '2',
      title: 'hello-world-2',
      updated: Date.now() - 1000 * 60 * 60 * 24,
      content: 'hello world second',
    },
  ]

  const article = articles.find((article) => article.slug === slug)

  if (!article) {
    throw 404
  }

  return {
    article,
  }
}

export const prerender = true
