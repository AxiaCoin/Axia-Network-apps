// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@axia-js/types';
import type { AuctionIndex, BlockNumber, LeasePeriodOf } from '@axia-js/types/interfaces';
import type { ITuple } from '@axia-js/types/types';
import type { AuctionInfo } from './types';

import { useApi, useCallMulti } from '@axia-js/react-hooks';

const optionsMulti = {
  transform: ([numAuctions, optInfo]: [AuctionIndex, Option<ITuple<[LeasePeriodOf, BlockNumber]>>]): AuctionInfo => {
    const [leasePeriod, endBlock] = optInfo.unwrapOr([null, null]);

    return {
      endBlock,
      leasePeriod,
      numAuctions
    };
  }
};

export default function useAuctionInfo (): AuctionInfo | undefined {
  const { api } = useApi();

  return useCallMulti<AuctionInfo>([
    api.query.auctions?.auctionCounter,
    api.query.auctions?.auctionInfo
  ], optionsMulti);
}
