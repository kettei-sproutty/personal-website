import { getBlogPosts } from '$lib/blog.server'

export const load = async (context) => {
  const slug = context.params.slug
  const articles = await getBlogPosts()
  const article = articles.find((article) => article.metadata.slug === slug)

  if (!article) throw 404

  return { article }
}

export const prerender = true
