// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { GroupProps } from './types';

import React from 'react';
import styled from 'styled-components';

function ButtonGroup ({ children, className = '', isCentered }: GroupProps): React.ReactElement<GroupProps> {
  return (
    <div className={`ui--Button-Group${isCentered ? ' isCentered' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default React.memo(styled(ButtonGroup)`
  margin: 1rem 0;
  text-align: right;
  width:100%;

  &.isCentered {
    margin-bottom: 0.5rem;
    text-align: center;
    // background:red;
  }

  &+.ui--Table {
    margin-top: 1.5rem;
  }

  .ui--Button {
    margin: 0 0.25rem;
  }

  .ui--CopyButton {
    display: inline-block;
  }
`);
