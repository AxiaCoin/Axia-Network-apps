// Copyright 2017-2021 @axia-js/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@axia-js/api';
import { Metadata, TypeRegistry } from '@axia-js/types';
import metaStatic from '@axia-js/types-support/metadata/static-axlib';

export function createAugmentedApi (): ApiPromise {
  const registry = new TypeRegistry();
  const metadata = new Metadata(registry, metaStatic);

  registry.setMetadata(metadata);

  const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry });

  api.injectMetadata(metadata, true);

  return api;
}
