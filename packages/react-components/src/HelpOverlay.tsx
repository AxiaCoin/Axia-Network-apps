// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactMd from 'react-markdown';
import styled from 'styled-components';

import { useToggle } from '@axia-js/react-hooks';

import Icon from './Icon';

interface Props {
  className?: string;
  md: string;
}

function HelpOverlay ({ className = '', md }: Props): React.ReactElement<Props> {
  const [isVisible, toggleVisible] = useToggle();

  return (
    <div className={`ui--HelpOverlay ${className}`}>
      {/* <div className='help-button'>
        <Icon
          icon='question-circle'
          onClick={toggleVisible}
        />
      </div>
      <div className={`help-slideout ${isVisible ? 'open' : 'closed'}`}>
        <div className='help-button HelpBtnIcon'>
          <Icon
            icon='times'
            onClick={toggleVisible}
            className='closeIcon'
          />
        </div>
        <ReactMd
          className='help-content'
          escapeHtml={false}
          source={md}
        />
      </div> */}
    </div>
  );
}

export default React.memo(styled(HelpOverlay)`
  .help-button {
    color: #777E91;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.35rem 8rem 0 0;

  }

  .HelpBtnIcon{
    color: #777E91;
    background: white;
    width: 50px;
    font-size: 15px;
    padding: 15px 20px;
    border-radius: 50%;
    margin-left: 91%;
    margin-top: 5px;

  }

  > .help-button {
    position: absolute;
    right: 0rem;
    top: 0rem;
    z-index: 10;
  }

  .help-slideout {
    background: var(--bg-page);
    box-shadow: -6px 0px 20px 0px rgba(0, 0, 0, 0.3);
    bottom: 0;
    max-width: 50rem;
    overflow-y: scroll;
    position: fixed;
    right: -50rem;
    top: 0;
    transition-duration: .5s;
    transition-property: all;
    z-index: 225; /* 5 more than menubar */

    .help-button {
      text-align: right;
    }

    .help-content {
      padding: 0rem 2em 5rem;
      // color:#000;
    }
    &.open {
      right: 0;
    }
    .help-content h1{
      text-transform:capitalize;
      color: #23262F;
      font-weight: 500;
      font-size: 24px;
    }
    .help-content p{
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #353945;
    }
  }
  .closeIcon {
    cursor: pointer;
    // position: absolute;
    // right: 0em;
    // top: 0.75rem;
    // background: red;
    // color: #fff;
  }
`);
