module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ['./node_modules/'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/domain/**',
    '!src/**/contracts/**',
    '!src/**/main/adapters/**',
    '!src/**/main/server.ts',
  ],
  moduleNameMapper: {
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
}
