module.exports = {
  '*.+(js|jsx|ts|tsx)': ['yarn lint:precomit'],
  '*.+(json|yml|yaml|css)': ['prettier --write'],
}
