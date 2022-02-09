// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TrieIndex } from '@axia-js/types/interfaces';

export interface Contributed {
  accountIds: string[];
  count: number;
  trieIndex: TrieIndex;
}
