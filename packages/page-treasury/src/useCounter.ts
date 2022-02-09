// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveTreasuryProposals } from '@axia-js/api-derive/types';

import { useMemo } from 'react';

import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';

export default function useCounter (): number {
  const { hasAccounts } = useAccounts();
  const { api, isApiReady } = useApi();
  const proposals = useCall<DeriveTreasuryProposals>(isApiReady && hasAccounts && api.derive.treasury?.proposals);

  return useMemo(
    () => proposals?.proposals.length || 0,
    [proposals]
  );
}
