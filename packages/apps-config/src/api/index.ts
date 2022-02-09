// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleType } from '@axia-js/types/types';

import typesChain from './chain';
import spec from './spec';

export * from './constants';
export * from './params';

export function getChainTypes (_specName: string, chainName: string): Record<string, string | Record<string, unknown>> {
  return {
    ...(typesChain[chainName as keyof typeof typesChain] || {})
  };
}

export const typesBundle: OverrideBundleType = { spec };

export { typesChain };
