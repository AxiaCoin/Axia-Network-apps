// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { EndpointOption } from './types';

import { AXIALUNAR_GENESIS } from '../api/constants';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint
export function createAXIALunar (t: TFunction): EndpointOption {
  return {
    dnslink: 'axialunar',
    genesisHash: AXIALUNAR_GENESIS,
    info: 'axialunar',
    text: t('rpc.axialunar.axia', 'AXIALunar', { ns: 'apps-config' }),
    providers: {
      AXIA: 'wss://axialunar-rpc.axia.io',
      OnFinality: 'wss://axialunar.api.onfinality.io/public-ws',
      'Patract Elara': 'wss://pub.elara.patract.io/axialunar',
      Dwellir: 'wss://axialunar-rpc.dwellir.com',
      'light client': 'light://axlib-connect/axialunar'
      // Pinknode: 'wss://rpc.pinknode.io/axialunar/explorer' // https://github.com/axia-js/apps/issues/5721
    },
    teleport: [1000],
    linked: [
    ]
  };
}
