// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@axia-js/types';
import type { Hash } from '@axia-js/types/interfaces';

import { useApi, useEventTrigger, useMapKeys } from '@axia-js/react-hooks';

function extractHashes (keys: StorageKey<[Hash]>[]): string[] {
  return keys.map(({ args: [hash] }) => hash.toHex());
}

export default function useTipHashes (): string[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.tips?.NewTip, api.events.tips?.TipClosed, api.events.tips?.TipRetracted]);

  return useMapKeys((api.query.tips || api.query.treasury)?.tips, { at: trigger.blockHash, transform: extractHashes });
}
