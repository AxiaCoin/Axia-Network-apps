// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageEntryBase } from '@axia-js/api/types';
import type { PalletConstantMetadataLatest } from '@axia-js/types/interfaces';
import type { AnyTuple } from '@axia-js/types/types';

export type StorageEntryPromise = StorageEntryBase<'promise', any, AnyTuple>;

export interface ConstValueBase {
  method: string;
  section: string;
}

export interface ConstValue extends ConstValueBase {
  meta: PalletConstantMetadataLatest;
}
