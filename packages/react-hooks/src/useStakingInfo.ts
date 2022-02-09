// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveStakingAccount } from '@axia-js/api-derive/types';

import { useApi } from './useApi';
import { useCall } from './useCall';

export function useStakingInfo (accountId: string | null): DeriveStakingAccount | undefined {
  const { api } = useApi();

  return useCall<DeriveStakingAccount>(api.derive.staking?.account, [accountId]);
}
