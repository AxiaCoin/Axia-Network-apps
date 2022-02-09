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
  isFinalized?: boolean;
  label?: React.ReactNode;
  withPound?: boolean;
}

function BestNumber ({ children, className = '', isFinalized, label, withPound }: Props): React.ReactElement<Props> {
  const { api, isApiReady } = useApi();
  const bestNumber = useCall<BlockNumber>(isApiReady && (isFinalized ? api.derive.chain.bestNumberFinalized : api.derive.chain.bestNumber));

  return (
    <div className={className}>
      {label || ''}{withPound && '#'}{
        bestNumber
          ? <Digits value={formatNumber(bestNumber)} />
          : '-'
      }{children}
    </div>
  );
}

export default React.memo(BestNumber);
