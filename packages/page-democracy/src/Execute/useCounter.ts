// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi, useCall } from '@axia-js/react-hooks';

export default function useCounter (): number {
  const { api } = useApi();
  const queued = useCall<unknown[]>(api.derive.democracy.dispatchQueue);

  return queued?.length || 0;
}
