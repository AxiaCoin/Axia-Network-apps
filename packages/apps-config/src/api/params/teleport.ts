// Copyright 2017-2021 @axia-js/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@axia-js/api';

import { AXIALUNAR_GENESIS } from '../constants';

// 3 * BaseXcmWeight on AXIALunar
const AXIALUNAR_WEIGHT = 3 * 1_000_000_000;

const DEFAULT_WEIGHT = AXIALUNAR_WEIGHT;

const KNOWN_WEIGHTS: Record<string, number> = {
  [AXIALUNAR_GENESIS]: AXIALUNAR_WEIGHT
};

export function getTeleportWeight (api: ApiPromise): number {
  return KNOWN_WEIGHTS[api.genesisHash.toHex()] || DEFAULT_WEIGHT;
}
