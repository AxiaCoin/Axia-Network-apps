// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BlockNumber } from '@axia-js/types/interfaces';

import React from 'react';

import { Digits } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function BestFinalized ({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const bestNumberFinalized = useCall<BlockNumber>(api.derive.chain.bestNumberFinalized);

  return (
    <div className={className}>
      {label || ''}{
        bestNumberFinalized
          ? <Digits value={formatNumber(bestNumberFinalized)} />
          : '-'
      }{children}
    </div>
  );
}

export default React.memo(BestFinalized);
