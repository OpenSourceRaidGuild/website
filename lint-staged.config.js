module.exports = {
  '*.+(js|jsx|ts|tsx)': ['yarn format', 'yarn lint'],
  // '*.+(js|jsx|ts|tsx)': ['eslint', 'yarn test:precommit'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
