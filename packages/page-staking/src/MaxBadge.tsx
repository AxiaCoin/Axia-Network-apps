// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Badge } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';

interface Props {
  numNominators?: number;
}

function MaxBadge ({ numNominators }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();

  const max = api.consts.staking?.maxNominatorRewardedPerValidator;

  if (!numNominators || !max || max.gten(numNominators)) {
    return null;
  }

  return (
    <Badge
      color='red'
      icon='balance-scale-right'
    />
  );
}

export default React.memo(MaxBadge);
