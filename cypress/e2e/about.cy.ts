describe('about page', () => {
  it('should display the about page', () => {
    cy.visit('/about')
    cy.get('h1').should('exist')
  })

  it('should return to the homepage', () => {
    cy.visit('/about')
    cy.get('a').contains(/back/i).click()
    cy.url().should('include', '/')
  })

  it('should return to the homepage with shortcut', () => {
    cy.visit('/about')
    cy.keypress('{backspace}')
    cy.url().should('include', '/')
  })
})
