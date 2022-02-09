// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BareProps as Props, ThemeDef } from '@axia-js/react-components/types';

import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import AccountSidebar from '@axia-js/app-accounts/Sidebar';
import { getSystemColor } from '@axia-js/apps-config';
import GlobalStyle from '@axia-js/react-components/styles';
import { useApi } from '@axia-js/react-hooks';
import Signer from '@axia-js/react-signer';

import ConnectingOverlay from './overlays/Connecting';
import Content from './Content';
import Menu from './Menu';
import WarmUp from './WarmUp';

export const PORTAL_ID = 'portals';

function Apps ({ className = '' }: Props): React.ReactElement<Props> {
  const { theme } = useContext<ThemeDef>(ThemeContext);
  const { isDevelopment, specName, systemChain, systemName } = useApi();

  const uiHighlight = useMemo(
    () => isDevelopment
      ? undefined
      : getSystemColor(systemChain, systemName, specName),
    [isDevelopment, specName, systemChain, systemName]
  );

  return (
    <>
      <GlobalStyle uiHighlight={uiHighlight} />
      <div className={`apps--Wrapper theme--${theme} ${className}`}>
        <Menu />
        <AccountSidebar>
          <Signer>
            <Content />
          </Signer>
          <ConnectingOverlay />
          <div id={PORTAL_ID} />
        </AccountSidebar>
      </div>
      <WarmUp />
    </>
  );
}

export default React.memo(styled(Apps)`
  background: var(--bg-page);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`);
