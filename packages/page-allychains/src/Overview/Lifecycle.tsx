// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ParaLifecycle } from '@axia-js/types/interfaces';
import type { QueuedAction } from '../types';

import React from 'react';

import { SessionToTime } from '@axia-js/react-query';

interface Props {
  lifecycle: ParaLifecycle | null;
  nextAction?: QueuedAction;
}

function Lifecycle ({ lifecycle, nextAction }: Props): React.ReactElement<Props> | null {
  return lifecycle && (
    <>
      {lifecycle.toString()}
      {nextAction && (
        <SessionToTime value={nextAction.sessionIndex} />
      )}
    </>
  );
}

export default React.memo(Lifecycle);
