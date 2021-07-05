module.exports = {
  // ...require('@snowpack/app-scripts-react/jest.config.js')(),
  moduleNameMapper: {
    '^#components/(.*)': '<rootDir>/src/components/$1',
    '^#utils/(.*)': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  transform: {},

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
}

/*
eslint
  @typescript-eslint/no-var-requires: "off",
*/
