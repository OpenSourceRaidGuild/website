/// <reference types="cypress" />

describe('Routes', () => {
  it('visit all routes', () => {
    cy.visit('/')
    cy.get('h1').should(
      'contain.text',
      'Welcome to the Open Source Raid Guild!',
    )

    cy.findByText('Raids').click()
    cy.get('h2')
      .should('contain.text', 'Active')
      .should('contain.text', 'Completed')
      .should('exist')
    cy.get('h1').should('contain.text', 'Raids').should('exist')
    cy.findByText(
      'Migrate to TypeScript | kentcdodds/babel-plugin-preval',
    ).click()
    cy.findByText('commits').should('exist')
    cy.findByText(/Contributors/i).should('exist')

    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids').should('exist')
    cy.findByText('Adding Tests | smeijer/unimported').click()
    cy.findByText('commits').should('exist')
    cy.findByText(/Contributors/i).should('exist')
  })
})
