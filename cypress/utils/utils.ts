import type axe from 'axe-core'

// Define at the top of the spec file or just import it
function terminalLog(violations: axe.Result[]) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`,
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  )

  cy.task('table', violationData)
}

const a11yRunOnly: axe.RunOptions = {
  runOnly: {
    type: 'tag',
    values: [
      'best-practice',
      'ACT',
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
    ],
  },
}
export { terminalLog, a11yRunOnly }
