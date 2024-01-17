module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.(css|less|scss)$': '<rootDir>/styleTransformer.js'
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(uuid)/)"
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^types/(.*)$': '<rootDir>/src/types/$1',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '^resources/(.*)$': '<rootDir>/src/resources/img/$1'
    }
};