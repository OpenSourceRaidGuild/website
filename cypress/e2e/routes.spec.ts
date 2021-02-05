/// <reference types="cypress" />

describe('Routes', () => {
  it('visit all routes', () => {
    cy.visit('/')
    cy.get('h1').should(
      'contain.text',
      'Welcome to the Open Source Raid Guild!',
    )

    cy.contains('Raids').click()
    cy.get('h2')
      .should('contain.text', 'Active')
      .should('contain.text', 'Completed')
    cy.get('h1').should('contain.text', 'Raids')
    cy.contains(
      'Migrate to TypeScript | kentcdodds/babel-plugin-preval',
    ).click()
    cy.contains('commits')
    cy.contains('Contributors')

    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids')
    cy.contains('Adding Tests | smeijer/unimported').click()
    cy.contains('commits')
    cy.contains('Contributors')
  })
})
