// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useAccounts } from '@axia-js/react-hooks';

export default function useCounter (): string | null {
  const { hasAccounts } = useAccounts();

  return hasAccounts ? null : '!';
}
