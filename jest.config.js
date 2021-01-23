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
    '^#components/(.*)': '<rootDir>/frontend/src/components/$1',
  },
  setupFilesAfterEnv: ['./frontend/src/setupTests.ts'],
}
