// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { expandEndpoints } from './util';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

// alphabetical based on chain name
export function createProduction (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [
    {
      info: 'canaryNet',
      text: t('rpc.prod.axccanarynet', 'AXC CanaryNet', { ns: 'apps-config' }),
      providers: {
        'ZFullCan': 'wss://wss.canary.axiacoin.network',
        'ZArchCan': 'wss://archive.canary.axiacoin.network'
        }
    },
    {
      info: 'chainx',
      text: t('rpc.prod.chainx', 'Dummy ChainX', { ns: 'apps-config' }),
      providers: {
        'NoWhere': 'wss://example.com'
      }
    }

  ], firstOnly, withSort);
}
