// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AbiMessage } from '@axia-js/api-contract/types';

import React from 'react';

import { ApiPromise } from '@axia-js/api';
import { ContractPromise as Contract } from '@axia-js/api-contract';
import { getContractAbi } from '@axia-js/react-components/util';

import MessageSignature from '../shared/MessageSignature';

export function findCallMethod (callContract: Contract | null, callMethodIndex = 0): AbiMessage | null {
  const message = callContract && callContract.abi.messages[callMethodIndex];

  return message || null;
}

export function getContractMethodFn (callContract: Contract | null, callMethodIndex: number | null): AbiMessage | null {
  const fn = callContract && callContract.abi && callMethodIndex !== null && callContract.abi.messages[callMethodIndex];

  return fn || null;
}

export function getContractForAddress (api: ApiPromise, address: string | null): Contract | null {
  if (!address) {
    return null;
  } else {
    const abi = getContractAbi(address);

    return abi
      ? new Contract(api, abi, address)
      : null;
  }
}

export function getCallMessageOptions (callContract: Contract | null): any[] {
  return callContract
    ? callContract.abi.messages.map((m, index): { key: string; text: React.ReactNode; value: number } => ({
      key: m.identifier,
      text: (
        <MessageSignature message={m} />
      ),
      value: index
    }))
    : [];
}
