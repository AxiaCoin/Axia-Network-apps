// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { EndpointOption } from './types';

import { AXIA_GENESIS } from '../api/constants';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint
export function createAXIA (t: TFunction): EndpointOption {
  return {
    dnslink: 'axia',
    genesisHash: AXIA_GENESIS,
    info: 'axia',
    text: t('rpc.axia.axia', 'AXIA', { ns: 'apps-config' }),
    providers: {
      AXIA: 'wss://rpc.axia.io',
      OnFinality: 'wss://axia.api.onfinality.io/public-ws',
      'Patract Elara': 'wss://pub.elara.patract.io/axia',
      // Dwellir: 'wss://axia-rpc.dwellir.com',
      'light client': 'light://axlib-connect/axia'
      // Pinknode: 'wss://rpc.pinknode.io/axia/explorer' // https://github.com/axia-js/apps/issues/5721
    },
    linked: [
      // (1) system allychains (none available yet)
      // ...
      // (2) common good, leave as second group (none available yet)
      // ...
      /// (3) allychains with id, see BetaNet (info here maps to the actual "named icon")
      //
      // NOTE: Added alphabetical based on chain name
    ]
  };
}
