// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CollectiveType } from './types';

import { useMemo } from 'react';

import { useApi } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';

export function useCollectiveInstance (instanceType: CollectiveType, instanceIndex?: number): CollectiveType | null {
  const { api } = useApi();

  return useMemo(
    (): CollectiveType | null => {
      const index = instanceIndex || 0;
      const instances = api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), instanceType);
      const instance = instances && (index < instances.length)
        ? instances[index] as 'council'
        : instanceType;

      return api.tx[instance] && isFunction(api.tx[instance].close)
        ? instance
        : null;
    },
    [api, instanceIndex, instanceType]
  );
}
