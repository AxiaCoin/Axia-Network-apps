// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { BN_ONE, BN_THOUSAND } from '@axia-js/util';

export const LOWEST_PUBLIC_ID = new BN(2_000);

export const LOWEST_INVALID_ID = LOWEST_PUBLIC_ID.sub(BN_ONE);

export const LOWEST_USER_ID = BN_THOUSAND;
