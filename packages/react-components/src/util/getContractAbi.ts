// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyJson } from '@axia-js/types/types';

import { Abi } from '@axia-js/api-contract';
import { api } from '@axia-js/react-api';

import { getAddressMeta } from './getAddressMeta';

export function getContractAbi (address: string | null): Abi | null {
  if (!address) {
    return null;
  }

  let abi: Abi | undefined;
  const meta = getAddressMeta(address, 'contract');

  try {
    const data = meta.contract && JSON.parse(meta.contract.abi) as AnyJson;

    abi = new Abi(data, api.registry.getChainProperties());
  } catch (error) {
    console.error(error);
  }

  return abi || null;
}
