// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';

import { StatusContext } from '@axia-js/react-components';

import Results from './Results';
import Selection from './Selection';

function RpcApp (): React.ReactElement {
  const { queueRpc, txqueue } = useContext(StatusContext);

  return (
    <>
      <Selection queueRpc={queueRpc} />
      <Results queue={txqueue} />
    </>
  );
}

export default React.memo(RpcApp);
