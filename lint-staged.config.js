module.exports = {
  // '*.+(js|jsx|ts|tsx)': ['eslint', 'yarn test:precommit'],
  '*.+(js|jsx|ts|tsx)': ['yarn lint'],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --write',
  ],
}
