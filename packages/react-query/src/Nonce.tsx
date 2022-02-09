// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { DeriveBalancesAll } from '@axia-js/api-derive/types';

import React from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';

interface Props {
  callOnResult?: (accountNonce: BN) => void;
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: string | null;
}

function Nonce ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const allBalances = useCall<DeriveBalancesAll>(api.derive.balances?.all, [params]);

  return (
    <div className={className}>
      {label || ''}{formatNumber(allBalances?.accountNonce)}{children}
    </div>
  );
}

export default React.memo(Nonce);
