// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@axia-js/types';
import type { TreasuryProposal as TreasuryProposalType } from '@axia-js/types/interfaces';

import React, { useEffect, useState } from 'react';

import { InputAddress, Labelled, Static } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';

import Inset, { InsetProps } from './Inset';
import { useTranslation } from './translate';

interface Props {
  className?: string;
  asInset?: boolean;
  insetProps?: Partial<InsetProps>;
  onClick?: () => void;
  proposalId?: string;
  proposal?: TreasuryProposalType | null;
  withLink?: boolean;
}

function TreasuryProposal ({ asInset, className = '', insetProps, onClick, proposal, proposalId }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [stateProposal, setProposal] = useState<TreasuryProposalType | null>(null);
  const { api } = useApi();

  useEffect((): void => {
    if (!proposal && proposalId) {
      api.query.treasury
        .proposals<Option<TreasuryProposalType>>(proposalId)
        .then((proposal): TreasuryProposalType | null => proposal.unwrapOr(null))
        .catch((): null => null)
        .then(setProposal)
        .catch(console.error);
    } else {
      setProposal(proposal || null);
    }
  }, [api, proposal, proposalId]);

  if (!stateProposal) {
    return null;
  }

  const { beneficiary, bond, proposer, value } = stateProposal;

  const inner = (
    <>
      <Labelled label={t<string>('proposed by')}>
        <InputAddress
          defaultValue={proposer}
          isDisabled
          value={proposer}
          withLabel={false}
        />
      </Labelled>
      <Labelled label={t<string>('beneficiary')}>
        <InputAddress
          defaultValue={beneficiary}
          isDisabled
          value={beneficiary}
          withLabel={false}
        />
      </Labelled>
      <Static label={t<string>('value')}>
        <FormatBalance value={value} />
      </Static>
      <Static label={t<string>('bond')}>
        <FormatBalance value={bond} />
      </Static>
    </>
  );

  if (asInset) {
    return (
      <Inset
        className={className}
        {...insetProps}
      >
        {inner}
      </Inset>
    );
  }

  return (
    <div
      className={className}
      onClick={onClick && onClick}
    >
      {inner}
    </div>
  );
}

export default React.memo(TreasuryProposal);
