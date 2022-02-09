// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export const AxiassemblyIo = {
  chains: {
    AXIALunar: 'axialunar',
    'AXIALunar CC3': 'axialunar',
    AXIA: 'axia'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.axcssembly.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.axcssembly as string,
  paths: {
    bounty: 'bounty',
    council: 'motion',
    proposal: 'proposal',
    referendum: 'referendum',
    tip: 'tip',
    treasury: 'treasury'
  },
  url: 'https://axcssembly.io/'
};

export const AxiassemblyNetwork = {
  ...AxiassemblyIo,
  chains: {
    Bifrost: 'bifrost',
    'KILT Spiritnet': 'kilt',
    Karura: 'karura',
    'Khala Network': 'khala',
    Moonriver: 'moonriver'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.axcssembly.network/${path}/${data.toString()}`,
  url: 'https://axcssembly.network/'
};
