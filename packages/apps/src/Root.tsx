// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeDef } from '@axia-js/react-components/types';
import type { KeyringStore } from '@axia-js/ui-keyring/types';

import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Api } from '@axia-js/react-api';
import Queue from '@axia-js/react-components/Status/Queue';
import { BlockAuthors, Events } from '@axia-js/react-query';
import { settings } from '@axia-js/ui-settings';

import Apps from './Apps';
import { darkTheme, lightTheme } from './themes';
import WindowDimensions from './WindowDimensions';

interface Props {
  store?: KeyringStore;
}

function createTheme ({ uiTheme }: { uiTheme: string }): ThemeDef {
  const validTheme = uiTheme === 'dark' ? 'dark' : 'light';

  document && document.documentElement &&
    document.documentElement.setAttribute('data-theme', validTheme);

  return uiTheme === 'dark'
    ? darkTheme
    : lightTheme;
}

function Root ({ store }: Props): React.ReactElement<Props> {
  const [theme, setTheme] = useState(() => createTheme(settings));

  useEffect((): void => {
    settings.on('change', (settings) => setTheme(createTheme(settings)));
  }, []);

  return (
    <Suspense fallback='...'>
      <ThemeProvider theme={theme}>
        <Queue>
          <Api
            apiUrl={settings.apiUrl}
            store={store}
          >
            <BlockAuthors>
              <Events>
                <HashRouter>
                  <WindowDimensions>
                    <Apps />
                  </WindowDimensions>
                </HashRouter>
              </Events>
            </BlockAuthors>
          </Api>
        </Queue>
      </ThemeProvider>
    </Suspense>
  );
}

export default React.memo(Root);
