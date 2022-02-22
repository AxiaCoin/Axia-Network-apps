// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalIssuance } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';

import SummarySession from './SummarySession';
import { useTranslation } from './translate';

interface Props {
  eventCount: number;
}

function Summary ({ eventCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();

  return (
    <SummaryBox>
      <section>
        {api.query.timestamp && (
          <>
            <CardSummary
              className='CustomBg'
              label={t<string>('last block')}
            >
              <TimeNow />
            </CardSummary>
            <CardSummary
              className='media--800 CustomBg'
              label={t<string>('target')}
            >
              <BlockToTime value={BN_ONE} />
            </CardSummary>
          </>
        )}
        {api.query.balances && (
          <CardSummary
            className='media--800 CustomBg'
            label={t<string>('total issuance')}
          >
            <TotalIssuance />
          </CardSummary>
        )}
      </section>
      <section className='media--1200'>
        <SummarySession className='CustomEcho' withEra={false} />
      </section>
      <section>
        <CardSummary
          className='media--1000 CustomBg'
          label={t<string>('last events')}
        >
          {formatNumber(eventCount)}
        </CardSummary>
        {api.query.grandpa && (
          <CardSummary
            className='CustomBg'
            label={t<string>('finalized')}
          >
            <BestFinalized />
          </CardSummary>
        )}
        <CardSummary
          className='CustomBg'
          label={t<string>('best')}
        >
          <BestNumber />
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(styled(Summary)`

`);
