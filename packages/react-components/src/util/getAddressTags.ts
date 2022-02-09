// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringItemType } from '@axia-js/ui-keyring/types';

import { getAddressMeta } from './getAddressMeta';

export function getAddressTags (address: string, type: KeyringItemType | null = null): string[] {
  return getAddressMeta(address, type).tags as string[] || [];
}
