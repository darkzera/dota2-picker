const { resolve } = require('path')
// Diretorio raiz da aplicacao
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {
    ...rootConfig, ... {
        rootDir: root,
        displayName: 'end2end-tests',
        setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
        testMatch: ["<rootDir>/test/**/*.test.ts"]
    }
};
