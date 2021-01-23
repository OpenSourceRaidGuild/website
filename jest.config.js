module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  moduleNameMapper: {
    '^#components/(.*)': '<rootDir>/src/components/$1',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
}
