// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDef } from '@axia-js/extension-inject/types';

export type ChainType = 'axlib' | 'ethereum';

export interface ChainInfo extends MetadataDef {
  color: string | undefined;
  chainType: ChainType;
}
