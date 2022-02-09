// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { DeriveBounties } from '@axia-js/api-derive/types';
import { useApi, useCall } from '@axia-js/react-hooks';

export default function useCounter (): number {
  const { api, isApiReady } = useApi();
  const bounties = useCall<DeriveBounties>(isApiReady && api.derive.bounties?.bounties);

  return useMemo(
    () => bounties?.length || 0,
    [bounties]
  );
}
