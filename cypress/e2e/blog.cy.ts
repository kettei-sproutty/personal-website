describe('blog page', () => {
  it('should display the blog page', () => {
    cy.visit('/blog')
    cy.get('section').should('exist')
  })

  it('should return to the homepage', () => {
    cy.visit('/blog')
    cy.get('a').contains(/back/i).click()
    cy.url().should('include', '/')
  })

  it('should not have an article', () => {
    cy.visit('/blog')
    cy.get('#blog-post')
      .contains(/Select an article/gi)
      .should('exist')
  })

  describe('filter', () => {
    it('should open the filter modal', () => {
      cy.visit('/blog')
      cy.keyup('s')
      cy.get('input').should('exist')
    })

    it('should close the filter modal', () => {
      cy.visit('/blog')
      cy.keyup('s')
      cy.get('input').should('exist')
      cy.get('button').contains(/close/i).click()
      cy.get('input').should('not.exist')
    })

    it('should filter the articles pressing <esc>', () => {
      cy.visit('/blog')
      cy.keyup('s')
      cy.get('input').should('be.focused').type('test')
      cy.get('input').should('have.value', 'test')
      cy.get('input').type('{esc}')
      cy.get('input').should('not.exist')
    })

    it('should filter the articles', () => {
      cy.visit('/blog')
      cy.keyup('s')
      cy.get('input').should('be.focused').type('test')
      cy.get('input').should('have.value', 'test')
      cy.get('button')
        .contains(/search/i)
        .click()
      cy.get('input').should('not.exist')
    })

    it('should filter the articles with <enter> key', () => {
      cy.visit('/blog')
      cy.keyup('s')
      cy.get('input').should('be.focused').type('test{enter}')
      cy.get('input').should('not.exist')
    })
  })

  describe('articles', () => {
    it('should display the articles', () => {
      cy.visit('/blog')
      cy.get('article').should('not.exist')
    })

    it('should navigate to an article', () => {
      cy.visit('/blog')
      cy.get('li > a').click()
      cy.url().should('include', '/blog/')
      cy.get('article').should('exist')
    })

    it('should select the only article when filtering', () => {
      cy.visit('/blog')
      cy.get('li > a > span')
        .first()
        .then(($a) => {
          const text = $a.text()
          cy.keyup('s')
          cy.get('input').should('be.focused').type(text).type('{enter}')
          cy.get('article').should('exist')
        })

      it('should reset filter', () => {
        cy.visit('/blog')
        cy.keyup('s')
        cy.get('input').should('be.focused').type(Math.random().toString())
        cy.get('button')
          .contains(/search/i)
          .click()
        cy.get('input').should('not.exist')
        cy.get('article').should('not.exist')
        cy.get('li > a').should('not.exist')
        cy.keyup('s')
        cy.get('input').should('exist')
        cy.get('input').type('{ctrl}a{backspace}')
        cy.get('button')
          .contains(/search/i)
          .click()
      })
    })
  })
})
