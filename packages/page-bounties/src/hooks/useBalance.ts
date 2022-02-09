// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@axia-js/types/interfaces';

import { DeriveBalancesAll } from '@axia-js/api-derive/types';
import { useApi, useCall } from '@axia-js/react-hooks';

export function useBalance (accountId: string | null): Balance | undefined {
  const { api } = useApi();

  return useCall<DeriveBalancesAll>(api.derive.balances?.all, [accountId])?.availableBalance;
}
