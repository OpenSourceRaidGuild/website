/// <reference types="cypress" />

import { a11yRunOnly, terminalLog } from '../utils/utils'

describe('A11y tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Home Page', () => {
    cy.injectAxe()
    cy.checkA11y(
      undefined,
      a11yRunOnly,

      terminalLog,
    )
  })
  it('Feedback', () => {
    cy.findByText('Feedback').click()
    cy.findByPlaceholderText(/your name/i).should('exist')

    cy.injectAxe()
    cy.checkA11y('form', a11yRunOnly, terminalLog)
  })

  it('AllRaids Page', () => {
    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids').should('exist')

    cy.injectAxe()
    cy.checkA11y(undefined, a11yRunOnly, terminalLog)
  })
  it('viewRaid Page', () => {
    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids').should('exist')

    cy.findByText('Adding Tests | smeijer/unimported').click()
    cy.findByText('commits').should('exist')
    cy.findByText(/Contributors/i).should('exist')

    cy.injectAxe()
    cy.checkA11y(undefined, a11yRunOnly, terminalLog)
  })
})
