// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, InputAddressSimple } from '@axia-js/react-components';

import { useTranslation } from '../translate';
import Validator from './Validator';

interface Props {
  className?: string;
}

function Query ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { value } = useParams<{ value: string }>();
  const [validatorId, setValidatorId] = useState<string | null>(value || null);

  const _onQuery = useCallback(
    (): void => {
      if (validatorId) {
        window.location.hash = `/staking/query/${validatorId}`;
      }
    },
    [validatorId]
  );

  return (
    <div className={className}>
      <InputAddressSimple
        className='staking--queryInput'
        defaultValue={value}
        help={t<string>('Display overview information for the selected validator, including blocks produced.')}
        label={t<string>('validator to query')}
        onChange={setValidatorId}
        onEnter={_onQuery}
      >
        <Button
          icon='play'
          isDisabled={!validatorId}
          onClick={_onQuery}
        />
      </InputAddressSimple>
      {value && (
        <Validator validatorId={value} />
      )}
    </div>
  );
}

export default React.memo(styled(Query)`
.ui.input>input {
  margin: 0px;
  max-width: 50%;
  margin-right: 12px;
  border: 2px solid #B1B5C4;
}
.isDisabled, .isReadOnly {
  height: 56px;
  width: 56px;
}

`);
