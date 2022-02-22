// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSessionProgress } from '@axia-js/api-derive/types';
import type { Forcing } from '@axia-js/types/interfaces';

import React from 'react';
import styled from 'styled-components';

import { CardSummary } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { Elapsed } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';

import { useTranslation } from './translate';

interface Props {
  className?: string;
  withEra?: boolean;
  withSession?: boolean;
}

function SummarySession ({ className, withEra = true, withSession = true }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const sessionInfo = useCall<DeriveSessionProgress>(api.derive.session?.progress);
  const forcing = useCall<Forcing>(api.query.staking?.forceEra);

  const eraLabel = t<string>('era');
  const sessionLabel = sessionInfo?.isEpoch
    ? t<string>('epoch')
    : t<string>('session');
  const activeEraStart = sessionInfo?.activeEraStart.unwrapOr(null);

  return (
    <>
      {sessionInfo && (
        <>
          {withSession && (
            sessionInfo.sessionLength.gt(BN_ONE)
              ? (
                <CardSummary
                  className={className}
                  label={sessionLabel}
                  progress={{
                    total: sessionInfo.sessionLength,
                    value: sessionInfo.sessionProgress,
                    withTime: true
                  }}
                />
              )
              : (
                <CardSummary label={sessionLabel}>
                  #{formatNumber(sessionInfo.currentIndex)}
                  {withEra && activeEraStart && <div className='isSecondary'>&nbsp;</div>}
                </CardSummary>
              )
          )}
          {forcing && !forcing.isForceNone && withEra && (
            sessionInfo.sessionLength.gt(BN_ONE)
              ? (
                <CardSummary
                  className={className}
                  label={eraLabel}
                  progress={{
                    total: forcing.isForceAlways ? sessionInfo.sessionLength : sessionInfo.eraLength,
                    value: forcing.isForceAlways ? sessionInfo.sessionProgress : sessionInfo.eraProgress,
                    withTime: true
                  }}
                />
              )
              : (
                <CardSummary
                  className={className}
                  label={eraLabel}
                >
                  #{formatNumber(sessionInfo.activeEra)}
                  {activeEraStart && (
                    <Elapsed
                      className='isSecondary'
                      value={activeEraStart}
                    >
                      &nbsp;{t('elapsed')}
                    </Elapsed>
                  )}
                </CardSummary>
              )
          )}
        </>
      )}
    </>
  );
}

export default React.memo(styled(SummarySession)`
 
`);
