// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React from 'react';

import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';

interface Props {
  dueBlocks: BN;
  endBlock: BN;
  label: string;
}

function DueBlocks ({ dueBlocks, endBlock, label }: Props): React.ReactElement<Props> {
  return (
    <>
      {dueBlocks.gtn(0) && (
        <>
          <BlockToTime value={dueBlocks}>
            &nbsp;({label})
          </BlockToTime>
          #{formatNumber(endBlock)}
        </>
      )}
    </>
  );
}

export default React.memo(DueBlocks);
