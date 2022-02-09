// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId, ParaValidatorIndex } from '@axia-js/types/interfaces';

export interface EventMapInfo {
  blockHash: string;
  blockNumber: BN;
  relayParent: string;
}

export interface ValidatorInfo {
  indexActive: ParaValidatorIndex;
  indexValidator: ParaValidatorIndex;
  validatorId: AccountId;
}
