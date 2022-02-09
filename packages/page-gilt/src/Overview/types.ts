// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { ActiveGiltsTotal, BalanceOf } from '@axia-js/types/interfaces';

export interface QueueTotal {
  balance: BalanceOf;
  index: number;
  numItems: BN;
}

export interface GiltInfo {
  activeIndex?: BN | null;
  activeTotal?: ActiveGiltsTotal;
  queueTotals?: QueueTotal[];
}
