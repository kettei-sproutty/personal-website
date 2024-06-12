/// <reference types="cypress" />

export type Key =
  | `{enter}`
  | `{esc}`
  | `{tab}`
  | `{backspace}`
  | `{del}`
  | `{uparrow}`
  | `{downarrow}`
  | `{leftarrow}`
  | `{rightarrow}`
  | `{home}`
  | `{end}`
  | `{pageup}`
  | `{pagedown}`
  | (string & {})

declare global {
  namespace Cypress {
    interface Chainable {
      keypress(key: Key): Chainable<void>
      keyup(key: Key): Chainable<void>
      keydown(key: Key): Chainable<void>
    }
  }
}

const keyFn = (event: 'keyup' | 'keydown' | 'keypress') => (key: Key) => {
  cy.get('body').trigger(event, { key })
}

Cypress.Commands.add('keypress', keyFn('keypress'))
Cypress.Commands.add('keyup', keyFn('keyup'))
Cypress.Commands.add('keydown', keyFn('keydown'))
