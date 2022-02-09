// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@axia-js/types';
import type { AccountId, AccountIndex, Address, StakingLedger } from '@axia-js/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
  label?: React.ReactNode;
}

const transformController = {
  transform: (value: Option<AccountId>) => value.unwrapOr(null)
};

const transformLedger = {
  transform: (value: Option<StakingLedger>) => value.unwrapOr(null)
};

function BondedDisplay ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const controllerId = useCall<AccountId | null>(api.query.staking?.bonded, [params], transformController);
  const stakingLedger = useCall<StakingLedger | null>(controllerId && api.query.staking?.ledger, [controllerId], transformLedger);

  return (
    <FormatBalance
      className={className}
      label={label}
      value={stakingLedger?.active}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(BondedDisplay);
