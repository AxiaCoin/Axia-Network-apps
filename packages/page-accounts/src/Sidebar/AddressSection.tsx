// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { AccountName, IdentityIcon, Input } from '@axia-js/react-components';
import { AddressFlags } from '@axia-js/react-hooks/types';

import { useTranslation } from '../translate';

interface Props {
  value: string,
  editingName: boolean,
  defaultValue: string,
  onChange: (value: string) => void,
  flags: AddressFlags,
  accountIndex: string | undefined,
}

function AddressSection ({ accountIndex, defaultValue, editingName, flags, onChange, value }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className='ui--AddressSection'>
      <IdentityIcon
        size={80}
        value={value}
      />
      <div className='ui--AddressSection__AddressColumn'>
        <AccountName
          
          override={
            editingName
              ? (
                <Input
                  className='name--input'
                  defaultValue={defaultValue}
                  label='name-input'
                  onChange={onChange}
                  withLabel={false}
                />
              )
              : flags.isEditable
                ? (defaultValue.toUpperCase() || t<string>('<unknown>'))
                : undefined
          }
          value={value}
          withSidebar={false}
        />
        <div className='ui--AddressMenu-addr'>
          {value}
        </div>
        {accountIndex && (
          <div className='ui--AddressMenu-index'>
            <label>{t<string>('index')}:</label> {accountIndex}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(styled(AddressSection)`
  .via-identity .name {
    font-size: 25px !important;
    line-height: 1.7rem !important;
    // color:red !important;
  }
`);
