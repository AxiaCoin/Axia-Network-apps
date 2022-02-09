// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@axia-js/types';
import type { ParaId, ParaLifecycle } from '@axia-js/types/interfaces';

import { useApi, useEventTrigger, useMapEntries } from '@axia-js/react-hooks';

function extractIds (entries: [StorageKey<[ParaId]>, Option<ParaLifecycle>][]): ParaId[] {
  return entries
    .map(([{ args: [paraId] }, optValue]): ParaId | null => {
      const value = optValue.unwrap();

      return value && (
        value.isParathread ||
        value.isUpgradingToAllychain ||
        value.isOutgoingParathread ||
        value.isOnboarding
      )
        ? paraId
        : null;
    })
    .filter((paraId): paraId is ParaId => !!paraId)
    .sort((a, b) => a.cmp(b));
}

export default function useUpomingIds (): ParaId[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.session.NewSession, api.events.registrar.Registered]);

  return useMapEntries(api.query.paras.paraLifecycles, { at: trigger.blockHash, transform: extractIds });
}
