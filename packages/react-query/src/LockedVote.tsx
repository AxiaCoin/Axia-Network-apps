// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCouncilVote } from '@axia-js/api-derive/types';
import type { AccountId, AccountIndex, Address } from '@axia-js/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function LockedVote ({ children, className = '', label, params }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const info = useCall<DeriveCouncilVote>(api.derive.council.votesOf, [params]);

  if (!info?.stake.gtn(0)) {
    return null;
  }

  return (
    <FormatBalance
      className={className}
      label={label}
      value={info?.stake}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(LockedVote);
