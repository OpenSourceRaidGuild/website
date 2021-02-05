module.exports = {
  '*.+(js|jsx|ts|tsx)': ['eslint --fix', 'yarn test:pre'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
