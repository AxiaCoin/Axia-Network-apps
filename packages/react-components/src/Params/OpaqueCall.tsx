// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsic } from '@axia-js/api/types';
import type { Props, RawParam } from '@axia-js/react-params/types';

import React, { useCallback } from 'react';

import { useApi } from '@axia-js/react-hooks';

import ExtrinsicDisplay from './Extrinsic';

function OpaqueCall ({ className = '', isDisabled, isError, label, onChange, onEnter, onEscape, withLabel }: Props): React.ReactElement<Props> {
  const { apiDefaultTxSudo } = useApi();

  const _onChange = useCallback(
    ({ isValid, value }: RawParam): void => {
      let callData = null;

      if (isValid && value) {
        callData = (value as SubmittableExtrinsic<'promise'>).method.toHex();
      }

      onChange && onChange({
        isValid,
        value: callData
      });
    },
    [onChange]
  );

  return (
    <ExtrinsicDisplay
      className={className}
      defaultValue={apiDefaultTxSudo}
      isDisabled={isDisabled}
      isError={isError}
      isPrivate
      label={label}
      onChange={_onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      withLabel={withLabel}
    />
  );
}

export default React.memo(OpaqueCall);
