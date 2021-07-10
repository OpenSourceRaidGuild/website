module.exports = {
  '*.+(js|jsx|ts|tsx)': ['eslint --fix'],
  '*.+(json|yml|yaml|css|js|jsx|ts|tsx)': ['npx rome check --apply'],
}
