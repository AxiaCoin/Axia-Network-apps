// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Header } from '@axia-js/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

interface Props {
  className?: string;
  label?: React.ReactNode;
}

function BestHash ({ className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const newHead = useCall<Header>(api.rpc.chain.subscribeNewHeads);

  return (
    <div className={className}>
      {label || ''}{newHead?.hash.toHex()}
    </div>
  );
}

export default React.memo(BestHash);
