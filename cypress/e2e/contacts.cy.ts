describe('contacts page', () => {
  it('should display the contacts page', () => {
    cy.visit('/contacts')
    cy.get('h1').should('exist')
  })

  it('should return to the homepage', () => {
    cy.visit('/contacts')
    cy.get('a').contains(/back/i).click()
    cy.url().should('include', '/')
  })

  // it('should return to the homepage with shortcut', () => {
  //   cy.visit('/contacts');
  //   cy.keypress('{backspace}');
  //   cy.url().should('include', '/');
  // });

  // describe('contacts form', () => {
  //   it('should submit the form', () => {
  //     cy.visit('/contacts');
  //     cy.get('input[name="name"]').type('cypress');
  //     cy.get('input[name="subject"]').type('e2e test');
  //     cy.get('input[name="email"]').type('cypress@alessiomarchi.dev');
  //     cy.get('textarea[name="message"]').type('cypress test');
  //     cy.get('button[type="submit"]').click();
  //     cy.get('button[type="submit"]').should('be.disabled');
  //   });

  //   it('should display input errors', () => {
  //   });

  //   it('should display a success message', () => {
  //   });
  // });
})
