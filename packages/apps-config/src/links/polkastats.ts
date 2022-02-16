// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    AlphaNet: 'alphanet'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.axiastats.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.axiastats as string,
  paths: {
    address: 'account',
    block: 'block',
    extrinsic: 'extrinsic',
    intention: 'intention',
    validator: 'validator'
  },
  url: 'https://axiastats.io/'
};
