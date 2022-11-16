describe('User journey', () => {
  it('tests user journey', () => {
    cy.visit('/signin')
    cy.get('[data-cy="email"]').type('shamwela@shamwela.com')
    cy.get('[data-cy="password"]').type('password')
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[alt="The Pizza Company"]').click()
    const itemName = 'Seafood Cocktail'
    cy.get(`[alt="${itemName}"]`).click()
    cy.get('[aria-label="Increase quantity"]').click()
    cy.get('[data-cy="order-button"]').click()
    cy.get('[data-cy="cart-button"]').click()
    // Since the quantity's increased once
    cy.get('[data-cy="quantity-select"]').contains('2')
    cy.get('[data-cy="item-name"]').should('eq', itemName)
  })
})

export {}
