// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsicFunction } from '@axia-js/api/types';
import type { Props } from '@axia-js/react-params/types';

import React from 'react';

import { useApi } from '@axia-js/react-hooks';

import Extrinsic from './Extrinsic';

function Call ({ className = '', isDisabled, isError, label, onChange, onEnter, onEscape, withLabel }: Props): React.ReactElement<Props> {
  const { api, apiDefaultTx } = useApi();

  const defaultValue = ((): SubmittableExtrinsicFunction<'promise'> => {
    try {
      return api.tx.balances.transfer;
    } catch (error) {
      return apiDefaultTx;
    }
  })();

  return (
    <Extrinsic
      className={className}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isError={isError}
      isPrivate={false}
      label={label}
      onChange={onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      withLabel={withLabel}
    />
  );
}

export default React.memo(Call);
