// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DropdownOptions } from '../../util/types';

import { ApiPromise } from '@axia-js/api';

export default function createOptions (api: ApiPromise): DropdownOptions {
  return Object
    .keys(api.tx)
    .sort()
    .filter((name): number => Object.keys(api.tx[name]).length)
    .map((name): { text: string; value: string } => ({
      text: name,
      value: name
    }));
}
