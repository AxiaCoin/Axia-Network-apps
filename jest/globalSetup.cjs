// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const { AlwaysPullPolicy, GenericContainer, Wait } = require('testcontainers');

const startAxlib = async () => {
  console.log('Axlib container starting...');

  const startedTestContainer = await new GenericContainer('axia/axlib')
    .withPullPolicy(new AlwaysPullPolicy())
    .withName('axia-apps-test-axlib')
    .withExposedPorts(9944)
    .withCmd(['--dev', '--ws-port=9944', '--unsafe-ws-external'])
    .withWaitStrategy(Wait.forLogMessage('New epoch 0 launching'))
    .start();

  console.log('Done.');

  process.env.TEST_AXLIB_PORT = startedTestContainer.getMappedPort(9944)?.toString() || '';
  global.__AXLIB__ = startedTestContainer;
};

module.exports = async () => {
  await startAxlib();
};
