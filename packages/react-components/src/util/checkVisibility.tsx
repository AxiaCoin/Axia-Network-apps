// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountInfo } from '@axia-js/api-derive/types';

import { ApiPromise } from '@axia-js/api';
import { keyring } from '@axia-js/ui-keyring';
import { isFunction } from '@axia-js/util';

export function checkVisibility (api: ApiPromise, address: string, accountInfo: DeriveAccountInfo, filterName = '', onlyNamed = false): boolean {
  let isVisible = false;
  const filterLower = filterName.toLowerCase();

  if (filterLower || onlyNamed) {
    if (accountInfo) {
      const { accountId, accountIndex, identity, nickname } = accountInfo;

      if (!onlyNamed && (accountId?.toString().includes(filterName) || accountIndex?.toString().includes(filterName))) {
        isVisible = true;
      } else if (isFunction(api.query.identity?.identityOf)) {
        isVisible =
          (!!identity?.display && identity.display.toLowerCase().includes(filterLower)) ||
          (!!identity?.displayParent && identity.displayParent.toLowerCase().includes(filterLower));
      } else if (nickname) {
        isVisible = nickname.toLowerCase().includes(filterLower);
      }
    }

    if (!isVisible) {
      const account = keyring.getAddress(address);

      isVisible = account?.meta?.name
        ? account.meta.name.toLowerCase().includes(filterLower)
        : false;
    }
  } else {
    isVisible = true;
  }

  return isVisible;
}
