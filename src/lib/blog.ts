export type MetadataKey = 'title' | 'description' | 'date' | 'slug'

export interface BlogPost {
  content: string
  metadata: Record<MetadataKey, string>
  slug: string
}

type SetMotionOptions = {
  key: string
  articles: BlogPost[]
  slug: string
  multiplier: number | null
}

type SetMotionReturnValue =
  | null
  | {
      selected: BlogPost
      lastMotion: string
      slug: string
    }
  | {
      multiplier: number
    }

export const setMotions = (options: SetMotionOptions): SetMotionReturnValue => {
  const motions: { [key: string]: () => SetMotionReturnValue } = {
    k: () => prevArticle(),
    j: () => nextArticle(),
    K: () => pageDown(),
    J: () => pageUp(),
    x: () => repeatMotion(),
    '/': () => search(),
  }

  if (/^\d$/.test(options.key)) return { multiplier: Number.parseInt(options.key) }

  const getIndex = (articles: BlogPost[], slug: string) =>
    articles.findIndex((article) => article.slug === slug)

  const prevArticle = (): SetMotionReturnValue => {
    const { articles, slug } = options
    const currentIndex = getIndex(articles, slug)
    const prevIndex = currentIndex - (options.multiplier || 1)
    if (prevIndex < 0) return { selected: articles[0], lastMotion: 'j', slug: articles[0].slug }
    return {
      selected: articles[prevIndex],
      lastMotion: `${options.multiplier || ''} ${options.key}`,
      slug: articles[prevIndex].slug,
    }
  }

  const nextArticle = () => {
    const { articles, slug } = options
    const currentIndex = getIndex(articles, slug)
    if (currentIndex === -1)
      return { selected: articles[0], lastMotion: 'k', slug: articles[0].slug }

    const nextIndex = currentIndex + (options.multiplier || 1)
    if (nextIndex >= articles.length)
      return {
        selected: articles[articles.length - 1],
        lastMotion: 'k',
        slug: articles[articles.length - 1].slug,
      }
    return {
      selected: articles[nextIndex],
      lastMotion: `${options.multiplier || ''} ${options.key}`,
      slug: articles[nextIndex].slug,
    }
  }

  const pageUp = () => {
    console.log('pageUp')
    return null
  }

  const pageDown = () => {
    console.log('pageDown')
    return null
  }

  const repeatMotion = () => {
    console.log('repeatMotion')
    return null
  }

  const search = () => {
    console.log('search')
    return null
  }

  if (options.key in motions) return motions[options.key]()

  return null
}
