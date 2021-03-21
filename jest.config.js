const { resolve } = require('path')

// Diretorio raiz da aplicacao
const root = resolve(__dirname);

module.exports = {
    rootDir: root,
    displayName: 'root-tests',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    testEnvironment: 'node',
    clearMocks: true,
    preset: 'ts-jest',
    moduleNameMapper: { 
        '@src/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/src/$1'
    },

};
