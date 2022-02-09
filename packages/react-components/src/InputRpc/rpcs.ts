// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Text } from '@axia-js/types';
import type { RuntimeVersion } from '@axia-js/types/interfaces';
import type { DefinitionRpc, DefinitionRpcExt, Registry } from '@axia-js/types/types';

import jsonrpc from '@axia-js/types/interfaces/jsonrpc';
import { getSpecRpc } from '@axia-js/types-known';

function toExt (section: string, input: Record<string, DefinitionRpc>): Record<string, DefinitionRpcExt> {
  return Object.entries(input).reduce((output: Record<string, DefinitionRpcExt>, [method, def]): Record<string, DefinitionRpcExt> => {
    output[method] = {
      isSubscription: false,
      jsonrpc: `${method}_${section}`,
      method,
      section,
      ...def
    };

    return output;
  }, {});
}

export function getAllRpc (registry: Registry, chain: Text, { specName }: RuntimeVersion): Record<string, Record<string, DefinitionRpcExt>> {
  return Object
    .entries(getSpecRpc(registry, chain, specName))
    .reduce((all: Record<string, Record<string, DefinitionRpcExt>>, [section, contents]): Record<string, Record<string, DefinitionRpcExt>> => {
      all[section] ??= toExt(section, contents);

      return all;
    }, { ...jsonrpc });
}
