// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { getBountyStatus } from '@axia-js/app-bounties/helpers';
import { BountyStatusType } from '@axia-js/app-bounties/types';
import { BountyStatus } from '@axia-js/types/interfaces';

export function useBountyStatus (status: BountyStatus): BountyStatusType {
  const updateStatus = useCallback(() => getBountyStatus(status), [status]);

  return updateStatus();
}
