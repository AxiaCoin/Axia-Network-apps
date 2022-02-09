// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderExtended } from '@axia-js/api-derive/types';
import type { KeyedEvent } from '@axia-js/react-query/types';

import React from 'react';

import { Columar } from '@axia-js/react-components';

import BlockHeaders from './BlockHeaders';
import Events from './Events';
import Query from './Query';
import Summary from './Summary';

interface Props {
  eventCount: number;
  events: KeyedEvent[];
  headers: HeaderExtended[];
}

function Main ({ eventCount, events, headers }: Props): React.ReactElement<Props> {
  return (
    <>
      <Query />
      <Summary eventCount={eventCount} />
      <Columar>
        <Columar.Column>
          <BlockHeaders headers={headers} />
        </Columar.Column>
        <Columar.Column>
          <Events events={events} />
        </Columar.Column>
      </Columar>
    </>
  );
}

export default React.memo(Main);
