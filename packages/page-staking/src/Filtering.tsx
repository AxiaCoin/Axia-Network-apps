// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import queryString from 'query-string';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Toggle } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { isString } from '@axia-js/util';

import { useTranslation } from './translate';

interface Props {
  children?: React.ReactNode;
  className?: string;
  nameFilter: string;
  setNameFilter: (value: string, isQuery: boolean) => void;
  setWithIdentity: (value: boolean) => void;
  withIdentity: boolean;
}

function Filtering ({ children, className, nameFilter, setNameFilter, setWithIdentity, withIdentity }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();

  // on load, parse the query string and extract the filter
  useEffect((): void => {
    const queryFilter = queryString.parse(location.href.split('?')[1]).filter;

    if (isString(queryFilter)) {
      setNameFilter(queryFilter, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _setNameFilter = useCallback(
    (value: string) => setNameFilter(value, false),
    [setNameFilter]
  );

  return (
    <div className='filtering'>
      <div className='CustomDisplay'>
        <Input
          autoFocus
          isFull
          label={t<string>('filter by name, address or index')}
          onChange={_setNameFilter}
          value={nameFilter}
        />
      </div>
      <div className='staking--optionsBar'>
        {children}
        {api.query.identity && (
          <Toggle
            className='staking--buttonToggle'
            label={t<string>('only with an identity')}
            onChange={setWithIdentity}
            value={withIdentity}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(styled(Filtering)`
  .filtering{
    display: flex!important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .CustomDisplay{
    width:50% !important;
  }
  .staking--optionsBar{
    width:50%;
  }
`);
