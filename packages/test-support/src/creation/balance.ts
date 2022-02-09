// Copyright 2017-2021 @axia-js/test-supports authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@axia-js/types/interfaces';

import BN from 'bn.js';

import { TypeRegistry } from '@axia-js/types/create';

export function balanceOf (number: number | string): Balance {
  return new TypeRegistry().createType('Balance', new BN(number));
}
