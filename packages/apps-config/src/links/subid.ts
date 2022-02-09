// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    Altair: 'altair',
    Bifrost: 'bifrost',
    'Centrifuge Mainnet': 'centrifuge',
    ChainX: 'chainx',
    Edgeware: 'edgeware',
    Karura: 'karura',
    Khala: 'khala',
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    SORA: 'sora-axlib',
    Shiden: 'shiden',
    Statemine: 'statemine',
    Subsocial: 'subsocial'
  },
  create: (_chain: string, _path: string, data: BN | number | string): string =>
    `https://sub.id/#/${data.toString()}`,
  isActive: true,
  logo: externalLogos.subid as string,
  paths: {
    address: 'account'
  },
  url: 'https://sub.id'
};
