// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { UnappliedSlash } from '@axia-js/types/interfaces';

export interface Slash {
  era: BN;
  isMine: boolean;
  slash: UnappliedSlash;
  total: BN;
  totalOther: BN;
}

export interface SlashEra {
  era: BN;
  nominators: string[];
  payout: BN;
  reporters: string[];
  slashes: Slash[];
  validators: string[];
  total: BN;
}
