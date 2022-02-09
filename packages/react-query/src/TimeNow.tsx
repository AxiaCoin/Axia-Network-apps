// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { Moment } from '@axia-js/types/interfaces';

import React, { useEffect, useState } from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

import Elapsed from './Elapsed';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  value?: Moment;
}

function TimeNow ({ children, className = '', label, value }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const timestamp = useCall<Moment>(!value && api.query.timestamp?.now);
  const [now, setNow] = useState<BN | undefined>();

  useEffect((): void => {
    setNow(value || timestamp);
  }, [timestamp, value]);

  if (!now) {
    return null;
  }

  return (
    <div className={className}>
      {label || ''}
      <Elapsed value={now} />
      {children}
    </div>
  );
}

export default React.memo(TimeNow);
