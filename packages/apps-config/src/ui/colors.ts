// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */

import { sanitize } from './util';

// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)

// defaults
const emptyColor = '#99999';

// based on chain name
// alphabetical


const chainAxccanarynet = '#F6C94A';
const chainChainx = '#F6C94A';
const chainAXIA = '#e6007a';
const chainAxctestnet = '#A92FAC';


const nodeAxccanarynet = '#F6C94A';
const nodeChainx = '#F6C94A';
const nodeAXIA = '#e6007a';
const nodeAxctestnet = '#A92FAC';



// based on the spec name

const specShell = '#2e86ab'; // '#0596FC';
const specStatemine = '#113911';
const specStatemint = '#86e62a';
const specWestmint = '#77bb77';

export { emptyColor };

// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via the system.chain RPC
export const chainColors: Record<string, string> = Object.entries({
      
  ChainX: chainChainx,
  AXIA: chainAXIA,
  axctestnet: chainAxctestnet,
  axccanarynet: chainAxccanarynet,

}).reduce<Record<string, string>>((colors, [chain, color]) => ({
  ...colors,
  [sanitize(chain)]: color
}), {});

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via the system.name RPC
export const nodeColors = Object.entries({

  ChainX: nodeChainx,
  axctestnet: nodeAxctestnet,
  axccanarynet: nodeAxccanarynet,

 }).reduce<Record<string, string>>((colors, [node, color]) => ({
  ...colors,
  [sanitize(node)]: color
}), {});

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via the system.name RPC
export const specColors = Object.entries({


  shell: specShell,
  statemine: specStatemine,
  statemint: specStatemint,
  westmint: specWestmint


}).reduce<Record<string, string>>((colors, [spec, color]) => ({
  ...colors,
  [sanitize(spec)]: color
}), {});
