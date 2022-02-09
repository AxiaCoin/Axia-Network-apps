// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    AXIALunar: 'axialunar',
    AXIA: 'axia'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://axcscanner.com/${chain}/${path}/${data.toString()}?utm_source=axiajs`,
  isActive: true,
  logo: externalLogos.axcscanner as string,
  paths: {
    address: 'account',
    block: 'block'
  },
  url: 'https://axcscanner.com/'
};
