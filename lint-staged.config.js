module.exports = {
  '*.+(js|jsx|ts|tsx)': ['eslint --fix', 'yarn test:ci --findRelatedTests'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
