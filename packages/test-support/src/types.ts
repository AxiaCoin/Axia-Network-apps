// Copyright 2017-2021 @axia-js/test-supports authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll, DeriveStakingAccount } from '@axia-js/api-derive/types';
import { UseAccountInfo } from '@axia-js/react-hooks/types';
import { KeyringJson$Meta } from '@axia-js/ui-keyring/types';

export type Override<T> = {
  [P in keyof T]?: T[P];
}

export interface AccountOverrides {
  meta?: Override<KeyringJson$Meta>;
  balance?: Override<DeriveBalancesAll>;
  staking?: Override<DeriveStakingAccount>;
  info?: Override<UseAccountInfo>;
}
