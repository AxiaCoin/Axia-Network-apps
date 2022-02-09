// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Compact, Option } from '@axia-js/types';
import type { ProposalIndex, TreasuryProposal } from '@axia-js/types/interfaces';
import type { TypeDef } from '@axia-js/types/types';

import React, { useEffect, useState } from 'react';

import { InputAddress, InputBalance } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types/create';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  value: Compact<ProposalIndex>;
}

interface Param {
  name: string;
  type: TypeDef;
}

interface Value {
  isValid: boolean;
  value: TreasuryProposal;
}

interface ParamState {
  params: Param[];
  values: Value[];
}

const DEFAULT_PARAMS: ParamState = { params: [], values: [] };

const transformProposal = {
  transform: (optProp: Option<TreasuryProposal>) => optProp.unwrapOr(null)
};

function TreasuryCell ({ className = '', value }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [proposalId] = useState(() => value.unwrap());
  const proposal = useCall<TreasuryProposal | null>(api.query.treasury.proposals, [proposalId], transformProposal);
  const [{ params, values }, setExtracted] = useState<ParamState>(DEFAULT_PARAMS);

  useEffect((): void => {
    proposal && setExtracted({
      params: [{
        name: 'proposal',
        type: getTypeDef('TreasuryProposal')
      }],
      values: [{
        isValid: true,
        value: proposal
      }]
    });
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return (
    <div className={className}>
      <Params
        isDisabled
        params={params}
        values={values}
      >
        <InputAddress
          defaultValue={proposal.beneficiary}
          isDisabled
          label={t<string>('beneficiary')}
        />
        <InputBalance
          defaultValue={proposal.value}
          isDisabled
          label={t<string>('payout')}
        />
      </Params>
    </div>
  );
}

export default React.memo(TreasuryCell);
