// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@axia-js/types/interfaces';

import { useApi, useCall } from '@axia-js/react-hooks';

const transformCounter = {
  transform: (proposals: Hash[]) => proposals.length
};

export default function useCounter (): number {
  const { api, isApiReady } = useApi();
  const counter = useCall<number>(isApiReady && api.query.membership?.proposals, undefined, transformCounter) || 0;

  return counter;
}
