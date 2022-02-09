// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Bid } from '@axia-js/types/interfaces';

import { useApi, useCall } from '@axia-js/react-hooks';

export default function useCounter (): number {
  const { api } = useApi();
  const bids = useCall<Bid[]>(api.query.society?.candidates);

  return bids?.length || 0;
}
