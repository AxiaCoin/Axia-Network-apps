// Copyright 2017-2021 @axia-js/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { defaultTreasury } from '@axia-js/test-support/creation/treasury/defaults';
import { defaultMembers } from '@axia-js/test-support/keyring/addresses';
import { extractTime } from '@axia-js/util';

export const mockHooks = {
  blockTime: [50, '', extractTime(1)],
  members: defaultMembers,
  treasury: defaultTreasury
};
