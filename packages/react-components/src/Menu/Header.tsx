// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderProps } from './types';

import React from 'react';
import styled from 'styled-components';

function Header ({ children, className }: HeaderProps): React.ReactElement {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default React.memo(styled(Header)`
  text-transform: capitalize;
  font-size: 14px;
  line-height: 0.857rem;

  margin-bottom: 0.3rem;
`);
