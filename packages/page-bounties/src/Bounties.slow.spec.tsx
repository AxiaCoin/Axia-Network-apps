// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@axia-js/react-components/i18n';

import { render } from '@testing-library/react';
import BN from 'bn.js';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BountiesApp from '@axia-js/app-bounties/index';
import { lightTheme } from '@axia-js/apps/themes';
import { Api } from '@axia-js/react-api';
import { createApi } from '@axia-js/test-support/api';
import { MemoryStore } from '@axia-js/test-support/keyring';
import { aliceSigner } from '@axia-js/test-support/keyring/signers';
import { WaitForApi } from '@axia-js/test-support/react';
import { execute } from '@axia-js/test-support/transaction/execute';

const AXLIB_PORT = Number.parseInt(process.env.TEST_AXLIB_PORT || '30333');

const renderBounties = () => {
  const memoryStore = new MemoryStore();

  return render(
    <Suspense fallback='...'>
      <MemoryRouter>
        <ThemeProvider theme={lightTheme}>
          <Api
            apiUrl={`ws://127.0.0.1:${AXLIB_PORT}`}
            store={memoryStore}
          >
            <WaitForApi>
              <div>
                <BountiesApp basePath='/bounties' />
              </div>
            </WaitForApi>
          </Api>
        </ThemeProvider>
      </MemoryRouter>
    </Suspense>
  );
};

describe('--SLOW--: Bounties', () => {
  it('list shows an existing bounty', async () => {
    const api = await createApi();

    await execute(api.tx.bounties.proposeBounty(new BN(500_000_000_000_000), 'a short bounty title'), aliceSigner());

    const { findByText } = renderBounties();

    expect(await findByText('a short bounty title', {}, { timeout: 20_000 })).toBeTruthy();
  });
});
