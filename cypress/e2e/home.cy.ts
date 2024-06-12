import { routes } from '../../src/lib/homepage-routes'

describe('homepage', () => {
  it('should display the homepage', () => {
    cy.visit('/')
    cy.get('h1').should('exist')
  })

  for (const [shortcut, url] of Object.entries(routes)) {
    it(`should navigate to the ${url} page`, () => {
      cy.visit('/')
      cy.get('a').contains(new RegExp(url, 'i')).click()
      cy.url().should('include', url)
    })

    it(`should navigate to the ${url} page with shortcut`, () => {
      cy.visit('/')
      cy.keypress(shortcut)
      cy.url().should('include', url)
    })
  }

  describe('changelog navigation', () => {
    it('should navigate to the changelog page', () => {
      cy.visit('/')
      cy.get('a')
        .contains(/changelog/i)
        .click()
      cy.url().should('include', '/changelog')
    })

    it('should navigate to the changelog page with shortcut', () => {
      cy.visit('/')
      cy.keypress('c')
      cy.url().should('include', '/changelog')
    })
  })
})
