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

type NullValue = { kind: 'null' }
type Multiplier = { kind: 'multiplier'; multiplier: number }
type SelectedArticle = { kind: 'select'; selected: BlogPost; lastMotion: string; slug: string }
type ShowModal = { kind: 'modal' }
type PageUpDown = { kind: 'page'; direction: 'up' | 'down' }
type RepeatMotion = { kind: 'repeat' }

type SetMotionReturnValue =
  | NullValue
  | Multiplier
  | SelectedArticle
  | ShowModal
  | PageUpDown
  | RepeatMotion

export const setMotions = (options: SetMotionOptions): SetMotionReturnValue => {
  const motions: { [key: string]: () => SetMotionReturnValue } = {
    k: () => prevArticle(),
    j: () => nextArticle(),
    K: () => pageDown(),
    J: () => pageUp(),
    x: () => repeatMotion(),
    '\\': () => search(),
  }

  if (/^\d$/.test(options.key))
    return { kind: 'multiplier', multiplier: Number.parseInt(options.key) }

  const getIndex = (articles: BlogPost[], slug: string) =>
    articles.findIndex((article) => article.slug === slug)

  const prevArticle = (): SetMotionReturnValue => {
    const { articles, slug } = options
    const currentIndex = getIndex(articles, slug)
    const prevIndex = currentIndex - (options.multiplier || 1)
    if (prevIndex < 0)
      return {
        kind: 'select' as const,
        selected: articles[0],
        lastMotion: 'j',
        slug: articles[0].slug,
      }
    return {
      kind: 'select' as const,
      selected: articles[prevIndex],
      lastMotion: `${options.multiplier || ''} ${options.key}`,
      slug: articles[prevIndex].slug,
    }
  }

  const nextArticle = () => {
    const { articles, slug } = options
    const currentIndex = getIndex(articles, slug)
    if (currentIndex === -1)
      return {
        kind: 'select' as const,
        selected: articles[0],
        lastMotion: 'k',
        slug: articles[0].slug,
      }

    const nextIndex = currentIndex + (options.multiplier || 1)
    if (nextIndex >= articles.length) {
      return {
        kind: 'select' as const,
        selected: articles[articles.length - 1],
        lastMotion: 'k',
        slug: articles[articles.length - 1].slug,
      }
    }

    return {
      kind: 'select' as const,
      selected: articles[nextIndex],
      lastMotion: `${options.multiplier || ''} ${options.key}`,
      slug: articles[nextIndex].slug,
    }
  }

  const pageUp = () => {
    return { kind: 'page' as const, direction: 'up' as const }
  }

  const pageDown = () => {
    return { kind: 'page' as const, direction: 'down' as const }
  }

  const repeatMotion = () => {
    return { kind: 'repeat' as const }
  }

  const search = () => {
    return { kind: 'modal' as const }
  }

  if (options.key in motions) return motions[options.key]()

  return { kind: 'null' as const }
}
