// Copyright 2017-2021 @axia-js/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@axia-js/types/interfaces';

import { AXIA_GENESIS } from '@axia-js/apps-config';
import { TypeRegistry } from '@axia-js/types/create';

export function aGenesisHash (): Hash {
  return new TypeRegistry().createType('Hash', AXIA_GENESIS);
}

export function aHash (): Hash {
  return new TypeRegistry().createType('Hash');
}
