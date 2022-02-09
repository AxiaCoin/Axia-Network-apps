// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountInfo } from '@axia-js/api-derive/types';
import type { AccountId, Address } from '@axia-js/types/interfaces';

import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useApi, useCall } from '@axia-js/react-hooks';

interface Props {
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string;
  label?: React.ReactNode;
  value?: string | AccountId | Address | null | Uint8Array;
}

function extractIndex ({ accountIndex }: Partial<DeriveAccountInfo> = {}): string | null {
  return accountIndex
    ? accountIndex.toString()
    : null;
}

function AccountIndex ({ children, className = '', defaultValue, label, value }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const info = useCall<DeriveAccountInfo>(api.derive.accounts.info, [value]);

  const accountIndex = useMemo(
    () => extractIndex(info),
    [info]
  );

  if (!api.query.indices) {
    return null;
  }

  return (
    <div className={`ui--AccountIndex ${className}`}>
      {label || ''}<div className='account-index'>{accountIndex || defaultValue || '-'}</div>{children}
    </div>
  );
}

export default React.memo(styled(AccountIndex)`
  .account-index {
    font: var(--font-mono);
  }
`);
