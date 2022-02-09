// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { LeasePeriod } from '../types';

import React from 'react';

import SummarySession from '@axia-js/app-explorer/SummarySession';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { BestFinalized } from '@axia-js/react-query';
import { formatNumber, isNumber } from '@axia-js/util';

import { useTranslation } from '../translate';

interface Props {
  leasePeriod?: LeasePeriod;
  allychainCount?: number;
  proposalCount?: number;
  upcomingCount?: number;
}

function Summary ({ leasePeriod, allychainCount, proposalCount, upcomingCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <SummaryBox>
      <section>
        {isNumber(allychainCount) && (
          <CardSummary label={t<string>('allychains')}>
            {formatNumber(allychainCount)}
          </CardSummary>
        )}
        {isNumber(upcomingCount) && (
          <CardSummary
            className='media--1000'
            label={t<string>('parathreads')}
          >
            {formatNumber(upcomingCount)}
          </CardSummary>
        )}
        {isNumber(proposalCount) && (
          <CardSummary
            className='media--1000'
            label={t<string>('proposals')}
          >
            {formatNumber(proposalCount)}
          </CardSummary>
        )}
      </section>
      <section>
        {leasePeriod && (
          <>
            <CardSummary label={t<string>('current lease')}>
              {formatNumber(leasePeriod.currentPeriod)}
            </CardSummary>
            <CardSummary
              className='media--1200'
              label={t<string>('lease period')}
              progress={{
                total: leasePeriod.length,
                value: leasePeriod.progress,
                withTime: true
              }}
            />
          </>
        )}
      </section>
      <section>
        <CardSummary label={t<string>('finalized')}>
          <BestFinalized />
        </CardSummary>
        <SummarySession
          className='media--1200'
          withEra={false}
        />
      </section>
    </SummaryBox>
  );
}

export default Summary;
