// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    // Kulupu: 'kulupu',
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    BetaNet: 'betanet'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://axiascan.io/${chain}/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.axiascan as string,
  paths: {
    address: 'account',
    block: 'block',
    council: 'council/motion',
    extrinsic: 'transaction',
    proposal: 'democracy/proposal',
    referendum: 'democracy/referendum',
    techcomm: 'techcomm/proposal',
    treasury: 'treasury/proposal'
  },
  url: 'https://axiascan.io/'
};
