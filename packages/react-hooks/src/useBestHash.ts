// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Header } from '@axia-js/types/interfaces';

import { useApi } from './useApi';
import { useCall } from './useCall';

const optCall = {
  transform: (header: Header) => header.hash.toHex()
};

export function useBestHash (): string | undefined {
  const { api } = useApi();

  return useCall<string>(api.rpc.chain.subscribeNewHeads, undefined, optCall);
}
