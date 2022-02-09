// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { keyring } from '@axia-js/ui-keyring';
import { u8aToHex } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';

import { useIsMountedRef } from './useIsMountedRef';

export interface UseAccounts {
  allAccounts: string[];
  allAccountsHex: string[];
  areAccountsLoaded: boolean
  hasAccounts: boolean;
  isAccount: (address?: string | null) => boolean;
}

const EMPTY: UseAccounts = { allAccounts: [], allAccountsHex: [], areAccountsLoaded: false, hasAccounts: false, isAccount: () => false };

export function useAccounts (): UseAccounts {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState<UseAccounts>(EMPTY);

  useEffect((): () => void => {
    const subscription = keyring.accounts.subject.subscribe((accounts): void => {
      if (mountedRef.current) {
        const allAccounts = accounts ? Object.keys(accounts) : [];
        const allAccountsHex = allAccounts.map((a) => u8aToHex(decodeAddress(a)));
        const hasAccounts = allAccounts.length !== 0;
        const isAccount = (address?: string | null) => !!address && allAccounts.includes(address);

        setState({ allAccounts, allAccountsHex, areAccountsLoaded: true, hasAccounts, isAccount });
      }
    });

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  }, [mountedRef]);

  return state;
}
