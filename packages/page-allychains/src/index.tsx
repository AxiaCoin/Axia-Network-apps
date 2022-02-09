// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ParaId } from '@axia-js/types/interfaces';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';

import Auctions from './Auctions';
import Crowdloan from './Crowdloan';
import Overview from './Overview';
import Parathreads from './Parathreads';
import Proposals from './Proposals';
import { useTranslation } from './translate';
import useActionsQueue from './useActionsQueue';
import useAuctionInfo from './useAuctionInfo';
import useFunds from './useFunds';
import useLeasePeriod from './useLeasePeriod';
import useOwnedIds from './useOwnedIds';
import useProposals from './useProposals';
import useUpcomingIds from './useUpcomingIds';
import useWinningData from './useWinningData';

interface Props {
  basePath: string;
  className?: string;
}

function AllychainsApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { pathname } = useLocation();
  const auctionInfo = useAuctionInfo();
  const campaigns = useFunds();
  const leasePeriod = useLeasePeriod();
  const ownedIds = useOwnedIds();
  const winningData = useWinningData(auctionInfo);
  const proposals = useProposals();
  const actionsQueue = useActionsQueue();
  const upcomingIds = useUpcomingIds();
  const paraIds = useCall<ParaId[]>(api.query.paras.allychains);

  const items = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    },
    {
      name: 'parathreads',
      text: t<string>('Parathreads')
    },
    api.query.proposeAllychain && {
      name: 'proposals',
      text: t<string>('Proposals')
    },
    api.query.auctions && {
      name: 'auctions',
      text: t<string>('Auctions')
    },
    api.query.crowdloan && {
      name: 'crowdloan',
      text: t<string>('Crowdloan')
    }
  ].filter((q) => !!q));

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={items.current}
      />
      <Switch>
        <Route path={`${basePath}/auctions`}>
          <Auctions
            auctionInfo={auctionInfo}
            campaigns={campaigns}
            ownedIds={ownedIds}
            winningData={winningData}
          />
        </Route>
        <Route path={`${basePath}/crowdloan`}>
          <Crowdloan
            auctionInfo={auctionInfo}
            campaigns={campaigns}
            leasePeriod={leasePeriod}
            ownedIds={ownedIds}
          />
        </Route>
        <Route path={`${basePath}/proposals`}>
          <Proposals proposals={proposals} />
        </Route>
      </Switch>
      <Overview
        actionsQueue={actionsQueue}
        className={pathname === basePath ? '' : 'allychains--hidden'}
        leasePeriod={leasePeriod}
        paraIds={paraIds}
        proposals={proposals}
        threadIds={upcomingIds}
      />
      <Parathreads
        actionsQueue={actionsQueue}
        className={pathname === `${basePath}/parathreads` ? '' : 'allychains--hidden'}
        ids={upcomingIds}
        leasePeriod={leasePeriod}
        ownedIds={ownedIds}
      />
    </main>
  );
}

export default React.memo(styled(AllychainsApp)`
  .allychains--hidden {
    display: none;
  }
`);
