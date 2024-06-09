import fs from 'node:fs'
import path from 'node:path'
import { compile } from 'mdsvex'

export type MetadataKey = 'title' | 'description' | 'date' | 'slug'

export interface BlogPost {
  content: string
  metadata: Record<MetadataKey, string>
  slug: string
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogDirectory = path.resolve('src/contents')
  const posts = await fs.promises.readdir(blogDirectory).catch(() => [])
  if (!posts.length) return []

  const postsList: BlogPost[] = []

  for (const post of posts) {
    const postPath = path.resolve(blogDirectory, post, 'blog.mdx')
    const postContent = await fs.promises.readFile(postPath, 'utf-8')
    const postCompiled = await compile(postContent)
    if (!postCompiled) {
      console.error('Error compiling post', postPath)
      continue
    }

    if (!postCompiled.data) {
      console.error('Error getting attributes from post', postPath)
      continue
    }

    const {
      title = post.replaceAll(/-/gi, ' '),
      description,
      date = new Date().toISOString(),
      slug = post,
    } = postCompiled.data as Record<MetadataKey, string>
    const content = postCompiled.code

    postsList.push({
      content,
      metadata: { ...postCompiled.data, title, description, date, slug },
      slug,
    })
  }

  return postsList
}
