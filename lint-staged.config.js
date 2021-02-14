module.exports = {
  '*.+(js|jsx|ts|tsx)': ['eslint --fix', 'yarn test:ci'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
