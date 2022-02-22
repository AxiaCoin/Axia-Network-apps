// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { u32 } from '@axia-js/types';
import type { ComponentProps as Props } from '../types';

import React from 'react';

import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';

import { useTranslation } from '../translate';

function Summary ({ className = '', members, proposalHashes, type }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const proposalCount = useCall<u32>(api.derive[type].proposalCount);

  return (
    <SummaryBox className={className}>
      <CardSummary className='CustomTechComm' label={t<string>('members')}>
        {formatNumber(members.length)}
      </CardSummary>
      {proposalCount && (
        <section>
          <CardSummary
            className='CustomTechComm'
            label={t<string>('proposals')}>
            {formatNumber(proposalHashes?.length)}
          </CardSummary>
          <CardSummary
             className='CustomTechComm'
            label={t<string>('total')}>
            {formatNumber(proposalCount)}
          </CardSummary>
        </section>
      )}
    </SummaryBox>
  );
}

export default React.memo(Summary);
