it('tests user journey', () => {
  // Test the search
  const sampleCategory = 'Pizza'
  const searchUrl = '/search?query=' + sampleCategory
  cy.visit(searchUrl)
  cy.get('[data-cy="category-name"]').should('contain.text', sampleCategory)

  // Test the login
  cy.visit('/signin')
  cy.get('[data-cy="email"]').type('shamwela@shamwela.com')
  cy.get('[data-cy="password"]').type('password')
  cy.get('[data-cy="sign-in-button"]').click()

  cy.get('[alt="The Pizza Company"]').click()
  const sampleItem = 'Seafood Cocktail'
  cy.get(`[alt="${sampleItem}"]`).click()
  cy.get('[aria-label="Increase quantity"]').click()
  cy.get('[data-cy="order-button"]').click()
  cy.get('[data-cy="cart-button"]').click()
  // Since the quantity is increased once, the quantity should be 2
  cy.get('[data-cy="quantity-select"]').contains('2')
  cy.get('[data-cy="item-name"]').should('contain.text', sampleItem)
})

export {}
