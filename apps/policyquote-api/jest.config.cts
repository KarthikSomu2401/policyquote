module.exports = {
  displayName: 'policyquote-api',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/policyquote-api',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|mjs|js)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
};