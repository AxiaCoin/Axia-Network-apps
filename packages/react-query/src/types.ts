// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BlockNumber, EventRecord } from '@axia-js/types/interfaces';

export interface IndexedEvent {
  indexes: number[];
  record: EventRecord;
}

export interface KeyedEvent extends IndexedEvent {
  blockHash?: string;
  blockNumber?: BlockNumber;
  key: string;
}
