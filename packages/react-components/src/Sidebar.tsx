// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import Button from './Button';

interface Props {
  button?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
  offset?: number | string;
  onClose: () => void;
  position: 'left' | 'right';
  sidebarRef: React.RefObject<HTMLDivElement>;
}

function Sidebar ({ button, children, className = '', dataTestId = '', onClose, sidebarRef }: Props): React.ReactElement<Props> {
  return (
    <div
      className={`ui--Sidebar ${className}`}
      data-testid={dataTestId}
      ref={sidebarRef}
    >
      <Button.Group className='ui--Sidebar-buttons'>
        {button}
        <Button
          dataTestId='close-sidebar-button'
          icon='times'
          isBasic
          isCircular
          className='CloseBtn'
          // eslint-disable-next-line react/jsx-closing-bracket-location
          onClick={onClose} />
      </Button.Group>
      {children}
    </div>
  );
}

export default React.memo(styled(Sidebar)(({ offset = 0, position }: Props) => `
  background: var(--bg-page);
  bottom: 0;
  box-shadow: ${position === 'right' ? '-6px' : '6px'} 0px 20px 0px rgba(0, 0, 0, 0.3);
  margin-left: -0.125rem;
  max-width: 24rem;
  min-width: 24rem;
  position: fixed;
  padding: 1rem;
  overflow-y: auto;
  top: 0;
  z-index: 999;
  ${position}: ${offset};

  .ui--Sidebar-buttons {
    margin: 0;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    // left:1.5rem;
  }
  .CloseBtn{
    // padding:0.8rem 1rem;
    height:48px;
    width:48px;
    background: #fff;
    
  }
    .ui--Button.isBasic:not(.isDisabled):not(.isIcon):not(.isSelected):not(.isReadOnly){
    box-shadow:none !important;
  }
  .ui--Button.isBasic:not(.isDisabled):not(.isIcon):not(.isSelected) .ui--Icon{
    color:#777E91 !important;
  }

`));
