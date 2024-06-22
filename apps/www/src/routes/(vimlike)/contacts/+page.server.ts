import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async (_event) => {
    const errors = []
    errors.push('Not implemented yet')
    return fail(400, { errors })
  },
}
