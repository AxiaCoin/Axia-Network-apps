// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex, Address } from '@axia-js/types/interfaces';

import React from 'react';

import { Nonce } from '@axia-js/react-query';

export interface Props {
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function NonceDisplay ({ className = '', label, params }: Props): React.ReactElement<Props> | null {
  if (!params) {
    return null;
  }

  return (
    <Nonce
      className={`ui--Nonce ${className}`}
      label={label}
      params={params.toString()}
    />
  );
}

export default React.memo(NonceDisplay);
