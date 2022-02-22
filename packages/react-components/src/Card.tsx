// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
  isError?: boolean;
  isSuccess?: boolean;
  withBottomMargin?: boolean;
}

function Card ({ children, className = '', isError, isSuccess, withBottomMargin }: Props): React.ReactElement<Props> {
  return (
    <article className={`ui--Card ${className}${(isError && !isSuccess) ? ' error' : ''}${(!isError && isSuccess) ? ' success' : ''}${withBottomMargin ? ' withBottomMargin' : ''}`}>
      {children}
    </article>
  );
}

export default React.memo(styled(Card)`
  position: relative;
  flex: 1 1;
  min-width: 24%;
  justify-content: space-around;

  h1,h2,h3,h4,h5{
    font-weight:600;
    font-size:15px;

  }

  .ui--Button-Group{
    text-align:right !important;
  }

  label {
    opacity: 0.42;
  }

  i.help.circle.icon,
  .ui.button.mini,
  .ui.button.tiny,
  .addTags {
    visibility: hidden;
  }

  .ui--AddressSummary-buttons {
    text-align: right;
    margin-bottom: 2em;

    button {
      margin-left: 0.2em;
    }
  }

  &:hover {
    i.help.circle.icon,
    .ui.button.mini,
    .ui.button.tiny,
    .addTags {
      visibility: visible;
    }

    label {
      opacity: 1;
    }
  }

  &.error {
    background: rgba(255, 0, 0, 0.05);

    &, h1, h2, h3, h4, h5, h6, p {
      color: rgba(156, 0, 0) !important;
    }
  }

  &.success {
    border: 1px solid rgb(168, 255, 136);
    background: rgba(0, 255, 0, 0.05);

    &, h1, h2, h3, h4, h5, h6, p {
      color: rgba(34, 125, 0) !important;
    }
  }

  &.withBottomMargin {
    margin-bottom: 1.5rem;
  }
  .WnYpr.isDisabled{
    color: #178FE1 !important;
  }
`);
