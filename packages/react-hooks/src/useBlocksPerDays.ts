// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { BN, bnToBn } from '@axia-js/util';

import { useBlockTime } from './useBlockTime';

const A_DAY = new BN(24 * 60 * 60 * 1000);

export function useBlocksPerDays (days: BN | number = 1): BN {
  const [blockTime] = useBlockTime();

  return useMemo(
    () => A_DAY.mul(bnToBn(days)).divn(blockTime),
    [blockTime, days]
  );
}
