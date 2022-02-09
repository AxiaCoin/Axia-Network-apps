// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

// overrides based on the actual software node type, valid values are one of -
// axia, axlib, beachball, robohash

export const identityNodes: Record<string, string> = [
  ['centrifuge chain', 'axia'],
  ['joystream-node', 'beachball'],
  ['axia-axia', 'axia']
].reduce((icons, [node, icon]): Record<string, string> => ({
  ...icons,
  [node.toLowerCase().replace(/-/g, ' ')]: icon
}), {});

export const identitySpec: Record<string, string> = [
  ['axia', 'axia'],
  ['statemine', 'axia'],
  ['statemint', 'axia'],
  ['westmint', 'axia']
].reduce((icons, [spec, icon]): Record<string, string> => ({
  ...icons,
  [spec.toLowerCase().replace(/-/g, ' ')]: icon
}), {});
