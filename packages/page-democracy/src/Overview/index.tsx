// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveReferendumExt } from '@axia-js/api-derive/types';

import React from 'react';
import styled from 'styled-components';

import { Button } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';
import Externals from './Externals';
import PreImage from './PreImage';
import Proposals from './Proposals';
import Propose from './Propose';
import Referendums from './Referendums';
import Summary from './Summary';

interface Props {
  className?: string;
}

function Overview ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isPreimageOpen, togglePreimage] = useToggle();
  const [isProposeOpen, togglePropose] = useToggle();
  const referendums = useCall<DeriveReferendumExt[]>(api.derive.democracy.referendums);

  return (
    <div className={className}>
      <Summary referendumCount={referendums?.length} />
      <Button.Group>
        <Button
          icon='plus'
          label={t<string>('Submit preimage')}
          onClick={togglePreimage}
        />
        <Button
          icon='plus'
          label={t<string>('Submit proposal')}
          onClick={togglePropose}
        />
      </Button.Group>
      {isPreimageOpen && (
        <PreImage onClose={togglePreimage} />
      )}
      {isProposeOpen && (
        <Propose onClose={togglePropose} />
      )}
      <Referendums referendums={referendums} />
      <Proposals />
      <Externals />
    </div>
  );
}

export default React.memo(styled(Overview)`
    .ui--Button{
      color: #178FE1 !important;
      font-weight:500 !important;
    }
    .ui--Button:hover{
      color: #fff !important;
      font-weight:500 !important;
    }
`);
