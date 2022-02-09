// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Bytes, Option } from '@axia-js/types';
import type { BlockNumber, Call, SchedulePeriod, SchedulePriority } from '@axia-js/types/interfaces';

export interface ScheduledExt {
  blockNumber: BlockNumber;
  call: Call;
  key: string;
  maybeId: Option<Bytes>;
  maybePeriodic: Option<SchedulePeriod>;
  priority: SchedulePriority;
}
