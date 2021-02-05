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
    cy.contains('Feedback').click()
    cy.contains('name')

    cy.injectAxe()
    cy.checkA11y('form', a11yRunOnly, terminalLog)
  })

  it('AllRaids Page', () => {
    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids')

    cy.injectAxe()
    cy.checkA11y(undefined, a11yRunOnly, terminalLog)
  })
  it('viewRaid Page', () => {
    cy.visit('/raids')
    cy.get('h1').should('contain.text', 'Raids')

    cy.contains('Adding Tests | smeijer/unimported').click()
    cy.contains('commits')
    cy.contains('Contributors')

    cy.injectAxe()
    cy.checkA11y(undefined, a11yRunOnly, terminalLog)
  })
})
