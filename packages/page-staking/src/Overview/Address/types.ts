// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@axia-js/types/interfaces';

export interface NominatorValue {
  nominatorId: string;
  value: Balance;
}
