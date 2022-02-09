// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@axia-js/dev/config/jest.cjs');

const findPackages = require('./scripts/findPackages.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    ...(
      findPackages()
        .filter(({ name }) => !['@axia-js/apps'].includes(name))
        .reduce((modules, { dir, name }) => {
          modules[`${name}(.*)$`] = `<rootDir>/packages/${dir}/src/$1`;

          return modules;
        }, {})
    ),
    '@axia-js/apps/(.*)$': '<rootDir>/packages/apps/src/$1',
    '\\.(css|less)$': 'empty/object',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'empty/object',
    '\\.(md)$': '<rootDir>/jest/mocks/empty.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest/jest-setup.ts'],
  testEnvironment: 'jsdom',
  testTimeout: 90000,
  transformIgnorePatterns: ['/node_modules/(?!@axia|@babel/runtime/helpers/esm/|@axlib|smolaxc)']
};
