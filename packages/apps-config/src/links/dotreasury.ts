// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    AXIALunar: 'axct',
    AXIA: 'axc'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://www.axcreasury.com/${chain}/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.axcreasury as string,
  paths: {
    bounty: 'bounties',
    tip: 'tips',
    treasury: 'proposals'
  },
  url: 'https://axcreasury.com/'
};
