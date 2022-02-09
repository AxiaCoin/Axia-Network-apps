// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSessionIndexes } from '@axia-js/api-derive/types';
import type { u32 } from '@axia-js/types';
import type { SessionRewards } from '../types';

import { useEffect, useState } from 'react';

import { useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
import { BN_ONE, BN_ZERO, isFunction } from '@axia-js/util';

export default function useBlockCounts (accountId: string, sessionRewards: SessionRewards[]): u32[] {
  const { api } = useApi();
  const mountedRef = useIsMountedRef();
  const indexes = useCall<DeriveSessionIndexes>(api.derive.session?.indexes);
  const current = useCall<u32>(api.query.imOnline?.authoredBlocks, [indexes?.currentIndex, accountId]);
  const [counts, setCounts] = useState<u32[]>([]);
  const [historic, setHistoric] = useState<u32[]>([]);

  useEffect((): void => {
    if (isFunction(api.query.imOnline?.authoredBlocks) && sessionRewards && sessionRewards.length) {
      const filtered = sessionRewards.filter(({ sessionIndex }): boolean => sessionIndex.gt(BN_ZERO));

      if (filtered.length) {
        Promise
          .all(filtered.map(({ parentHash, sessionIndex }): Promise<u32> =>
            api.query.imOnline.authoredBlocks.at(parentHash, sessionIndex.sub(BN_ONE), accountId)
          ))
          .then((historic): void => {
            mountedRef.current && setHistoric(historic);
          }).catch(console.error);
      }
    }
  }, [accountId, api, mountedRef, sessionRewards]);

  useEffect((): void => {
    setCounts([...historic, current || api.createType('u32')].slice(1));
  }, [api, current, historic]);

  return counts;
}
