module.exports = {
  '*.+(js|jsx|ts|tsx)': ['yarn lint:precomit'],
  // '*.+(js|jsx|ts|tsx)': ['yarn lP:precommit', 'yarn test:precommit'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
