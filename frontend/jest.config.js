module.exports = {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '^#components/(.*)': '<rootDir>/src/components/$1',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
}
