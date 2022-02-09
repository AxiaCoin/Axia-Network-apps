// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ContractCallOutcome } from '@axia-js/api-contract/types';
import type { SignedBlockExtended } from '@axia-js/api-derive/types';
import type { ContractLink } from './types';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ApiPromise } from '@axia-js/api';
import { ContractPromise } from '@axia-js/api-contract';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';

import { useTranslation } from '../translate';
import Call from './Call';
import Contract from './Contract';
import { getContractForAddress } from './util';

export interface Props {
  contracts: string[];
  updated: number;
}

interface Indexes {
  contractIndex: number;
  messageIndex: number;
  onCallResult?: (messageIndex: number, result?: ContractCallOutcome) => void;
}

function filterContracts (api: ApiPromise, keyringContracts: string[] = []): ContractPromise[] {
  return keyringContracts
    .map((address) => getContractForAddress(api, address.toString()))
    .filter((contract): contract is ContractPromise => !!contract);
}

function ContractsTable ({ contracts: keyringContracts }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const newBlock = useCall<SignedBlockExtended>(api.derive.chain.subscribeNewBlocks);
  const [{ contractIndex, messageIndex, onCallResult }, setIndexes] = useState<Indexes>({ contractIndex: 0, messageIndex: 0 });
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [contractLinks, setContractLinks] = useState<Record<string, ContractLink[]>>({});

  const headerRef = useRef<[string?, string?, number?][]>([
    [t('contracts'), 'start'],
    [undefined, undefined, 3],
    [t('status'), 'start'],
    []
  ]);

  useEffect((): void => {
    if (newBlock) {
      const exts = newBlock.block.extrinsics
        .filter(({ method }) => api.tx.contracts.call.is(method))
        .map(({ args }): ContractLink | null => {
          const contractId = keyringContracts.find((a) => args[0].eq(a));

          if (!contractId) {
            return null;
          }

          return {
            blockHash: newBlock.block.header.hash.toHex(),
            blockNumber: formatNumber(newBlock.block.header.number),
            contractId
          };
        })
        .filter((value): value is ContractLink => !!value);

      exts.length && setContractLinks((links): Record<string, ContractLink[]> => {
        exts.forEach((value): void => {
          links[value.contractId] = [value].concat(links[value.contractId] || []).slice(0, 3);
        });

        return { ...links };
      });
    }
  }, [api, keyringContracts, newBlock]);

  const contracts = useMemo(
    () => filterContracts(api, keyringContracts),
    [api, keyringContracts]
  );

  const _toggleCall = useCallback(
    () => setIsCallOpen((isCallOpen) => !isCallOpen),
    []
  );

  const _onCall = useCallback(
    (contractIndex: number, messageIndex: number, onCallResult: (messageIndex: number, result?: ContractCallOutcome) => void): void => {
      setIndexes({ contractIndex, messageIndex, onCallResult });
      setIsCallOpen(true);
    },
    []
  );

  const _setMessageIndex = useCallback(
    (messageIndex: number) => setIndexes((state) => ({ ...state, messageIndex })),
    []
  );

  const contract = contracts[contractIndex] || null;

  return (
    <>
      <Table
        empty={t<string>('No contracts available')}
        header={headerRef.current}
      >
        {contracts.map((contract, index): React.ReactNode => (
          <Contract
            contract={contract}
            index={index}
            key={contract.address.toString()}
            links={contractLinks[contract.address.toString()]}
            onCall={_onCall}
          />
        ))}
      </Table>
      {isCallOpen && contract && (
        <Call
          contract={contract}
          isOpen={isCallOpen}
          messageIndex={messageIndex}
          onCallResult={onCallResult}
          onChangeMessage={_setMessageIndex}
          onClose={_toggleCall}
        />
      )}
    </>
  );
}

export default React.memo(ContractsTable);
