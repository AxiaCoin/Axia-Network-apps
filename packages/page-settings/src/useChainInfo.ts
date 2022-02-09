// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChainInfo } from './types';

import { useMemo } from 'react';

import { getSystemColor, getSystemIcon } from '@axia-js/apps-config';
import { DEFAULT_DECIMALS, DEFAULT_SS58 } from '@axia-js/react-api';
import { useApi } from '@axia-js/react-hooks';
import { getSpecTypes } from '@axia-js/types-known';
import { formatBalance, isNumber } from '@axia-js/util';
import { base64Encode } from '@axia-js/util-crypto';

export default function useChainInfo (): ChainInfo | null {
  const { api, isApiReady, isEthereum, specName, systemChain, systemName } = useApi();

  return useMemo(
    () => isApiReady
      ? {
        chain: systemChain,
        chainType: isEthereum
          ? 'ethereum'
          : 'axlib',
        color: getSystemColor(systemChain, systemName, specName),
        genesisHash: api.genesisHash.toHex(),
        icon: getSystemIcon(systemName, specName),
        metaCalls: base64Encode(api.runtimeMetadata.asCallsOnly.toU8a()),
        specVersion: api.runtimeVersion.specVersion.toNumber(),
        ss58Format: isNumber(api.registry.chainSS58)
          ? api.registry.chainSS58
          : DEFAULT_SS58.toNumber(),
        tokenDecimals: (api.registry.chainDecimals || [DEFAULT_DECIMALS.toNumber()])[0],
        tokenSymbol: (api.registry.chainTokens || formatBalance.getDefaults().unit)[0],
        types: getSpecTypes(api.registry, systemChain, api.runtimeVersion.specName, api.runtimeVersion.specVersion) as unknown as Record<string, string>
      }
      : null,
    [api, isApiReady, specName, systemChain, systemName, isEthereum]
  );
}
