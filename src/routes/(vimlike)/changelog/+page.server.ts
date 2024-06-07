import { redirect } from '@sveltejs/kit'
import { compile } from 'mdsvex'

export const load = async () => {
  try {
    const changelogs = await fetch(
      'https://raw.githubusercontent.com/kettei-sproutty/personal-website/release-please--branches--main--components--www/CHANGELOG.md',
    )
    const changelogText = await changelogs.text()
    const compiled = await compile(changelogText)
    if (!compiled) {
      redirect(500, '/500')
    }

    return {
      status: 200,
      data: {
        changelogs: compiled,
      },
    }
  } catch (error) {
    redirect(500, '/500')
  }
}

export const ssr = true
