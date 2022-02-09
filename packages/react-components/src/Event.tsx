// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecodedEvent } from '@axia-js/api-contract/types';
import type { Bytes } from '@axia-js/types';
import type { Event } from '@axia-js/types/interfaces';
import type { Codec } from '@axia-js/types/types';

import React, { useMemo } from 'react';

import { Input } from '@axia-js/react-components';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types';

import { useTranslation } from './translate';
import { getContractAbi } from './util';

export interface Props {
  children?: React.ReactNode;
  className?: string;
  value: Event;
}

interface Value {
  isValid: boolean;
  value: Codec;
}

interface AbiEvent extends DecodedEvent {
  values: Value[];
}

function EventDisplay ({ children, className = '', value }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const params = value.typeDef.map(({ type }) => ({ type: getTypeDef(type) }));
  const values = value.data.map((value) => ({ isValid: true, value }));

  const abiEvent = useMemo(
    (): AbiEvent | null => {
      // for contracts, we decode the actual event
      if (value.section === 'contracts' && value.method === 'ContractExecution' && value.data.length === 2) {
        // see if we have info for this contract
        const [accountId, encoded] = value.data;

        try {
          const abi = getContractAbi(accountId.toString());

          if (abi) {
            const decoded = abi.decodeEvent(encoded as Bytes);

            return {
              ...decoded,
              values: decoded.args.map((value) => ({ isValid: true, value }))
            };
          }
        } catch (error) {
          // ABI mismatch?
          console.error(error);
        }
      }

      return null;
    },
    [value]
  );

  return (
    <div className={`ui--Event ${className}`}>
      {children}
      <Params
        isDisabled
        params={params}
        values={values}
      >
        {abiEvent && (
          <>
            <Input
              isDisabled
              label={t<string>('contract event')}
              value={abiEvent.event.identifier}
            />
            <Params
              isDisabled
              params={abiEvent.event.args}
              values={abiEvent.values}
            />
          </>
        )}
      </Params>
    </div>
  );
}

export default React.memo(EventDisplay);
