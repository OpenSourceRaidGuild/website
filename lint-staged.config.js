module.exports = {
  '*.+(js|jsx|ts|tsx)': ['yarn lint'],
  // '*.+(js|jsx|ts|tsx)': ['eslint', 'yarn test:precommit'],
  '*.+(js|jsx|json|yml|yaml|css|ts|tsx)': ['prettier --write'],
}
