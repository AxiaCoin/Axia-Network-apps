// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

module.exports = async () => {
  console.log('Shutting down Axlib container...');

  await global.__AXLIB__.stop();

  console.log('Done.');
};
