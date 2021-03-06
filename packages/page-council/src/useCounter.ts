// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@axia-js/api-derive/types';

import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';

const transformCounter = {
  transform: (motions: DeriveCollectiveProposal[]) => motions.filter(({ votes }): boolean => !!votes).length
};

export default function useCounter (): number {
  const { hasAccounts } = useAccounts();
  const { api, isApiReady } = useApi();
  const counter = useCall<number>(isApiReady && hasAccounts && api.derive.council?.proposals, undefined, transformCounter) || 0;

  return counter;
}
