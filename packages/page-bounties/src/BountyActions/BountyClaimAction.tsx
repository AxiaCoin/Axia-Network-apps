// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId, BountyIndex } from '@axia-js/types/interfaces';

import React, { useMemo } from 'react';

import { useBounties } from '@axia-js/app-bounties/hooks';
import { TxButton } from '@axia-js/react-components';
import { useAccounts } from '@axia-js/react-hooks';

import { isClaimable } from '../helpers';
import { useTranslation } from '../translate';

interface Props {
  beneficiaryId: AccountId;
  index: BountyIndex;
  payoutDue: BN;
}

function BountyClaimAction ({ beneficiaryId, index, payoutDue }: Props) {
  const { t } = useTranslation();
  const { claimBounty } = useBounties();
  const { allAccounts } = useAccounts();

  const isBountyClaimable = useMemo(
    () => isClaimable(allAccounts, beneficiaryId, payoutDue),
    [allAccounts, beneficiaryId, payoutDue]
  );

  return isBountyClaimable
    ? (
      <TxButton
        accountId={beneficiaryId}
        icon='plus'
        label={t<string>('Claim')}
        params={[index]}
        tx={claimBounty}
      />
    )
    : null;
}

export default React.memo(BountyClaimAction);
