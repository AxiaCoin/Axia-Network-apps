// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { DeriveSessionInfo } from '@axia-js/api-derive/types';

import { useMemo } from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ONE } from '@axia-js/util';

export default function useUnbondDuration (): BN | undefined {
  const { api } = useApi();
  const sessionInfo = useCall<DeriveSessionInfo>(api.derive.session.info);

  return useMemo(
    () => (sessionInfo && sessionInfo.sessionLength.gt(BN_ONE))
      ? sessionInfo.eraLength.mul(api.consts.staking.bondingDuration)
      : undefined,
    [api, sessionInfo]
  );
}
