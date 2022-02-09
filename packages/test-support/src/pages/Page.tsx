// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { render, RenderResult, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AccountSidebar from '@axia-js/app-accounts/Sidebar';
import { lightTheme } from '@axia-js/apps/themes';
import { AXIA_GENESIS } from '@axia-js/apps-config';
import { ApiContext } from '@axia-js/react-api';
import { ApiProps } from '@axia-js/react-api/types';
import { QueueProvider } from '@axia-js/react-components/Status/Context';
import { PartialQueueTxExtrinsic, QueueProps, QueueTxExtrinsicAdd } from '@axia-js/react-components/Status/types';
import { UseAccountInfo } from '@axia-js/react-hooks/types';
import { mockApiHooks } from '@axia-js/test-support/utils/mockApiHooks';
import { TypeRegistry } from '@axia-js/types/create';
import { keyring } from '@axia-js/ui-keyring';

import { alice, bob, charlie } from '../keyring';
import { Table } from '../pagesElements';
import { AccountOverrides, mockAccountHooks } from '../utils/accountDefaults';

let queueExtrinsic: (value: PartialQueueTxExtrinsic) => void;

class NotYetRendered extends Error {
}

jest.mock('@axia-js/react-hooks/useAccounts', () => ({
  useAccounts: () => mockAccountHooks.useAccounts
}));

jest.mock('@axia-js/react-hooks/useAccountInfo', () => {
  // eslint-disable-next-line func-call-spacing
  const actual = jest.requireActual<{useAccountInfo: (address: string) => UseAccountInfo}>('@axia-js/react-hooks/useAccountInfo');

  return ({
    useAccountInfo: (address: string) => {
      const mockInfo = mockAccountHooks.accountsMap[address];

      return mockInfo
        ? {
          ...actual.useAccountInfo(address),
          flags: { ...actual.useAccountInfo(address).flags, ...(mockInfo.info.flags) },
          identity: { ...actual.useAccountInfo(address).identity, ...(mockInfo.info.identity) },
          tags: [...actual.useAccountInfo(address).tags, ...(mockInfo.info.tags)]
        }
        : actual.useAccountInfo(address);
    }
  });
});

jest.mock('@axia-js/react-hooks/useLoadingDelay', () => ({
  useLoadingDelay: () => false
}));

jest.mock('@axia-js/react-hooks/useBalancesAll', () => ({
  useBalancesAll: (address: string) => mockAccountHooks.accountsMap[address].balance
}));

jest.mock('@axia-js/react-hooks/useStakingInfo', () => ({
  useStakingInfo: (address: string) => mockAccountHooks.accountsMap[address].staking
}));

jest.mock('@axia-js/react-hooks/useBestNumber', () => ({
  useBestNumber: () => 1
}));

jest.mock('@axia-js/react-hooks/useSubidentities', () => ({
  useSubidentities: () => mockApiHooks.subs
}));

export abstract class Page {
  private renderResult?: RenderResult
  protected readonly defaultAddresses = [alice, bob, charlie];

  protected constructor (private readonly overview: React.ReactElement, private readonly rowClassName: string) {
    this.overview = overview;
    this.rowClassName = rowClassName;
  }

  render (accounts: [string, AccountOverrides][]): void {
    mockAccountHooks.setAccounts(accounts);

    accounts.forEach(([address, { meta }]) => {
      keyring.addExternal(address, meta);
    });

    const noop = () => Promise.resolve(() => { /**/ });
    const mockApi: ApiProps = {
      api: {
        derive: {
          accounts: {
            info: noop
          },
          balances: {
            all: noop
          },
          democracy: {
            locks: noop
          },
          staking: {
            account: noop
          }
        },
        genesisHash: new TypeRegistry().createType('Hash', AXIA_GENESIS),
        query: {
          democracy: {
            votingOf: noop
          },
          identity: {
            identityOf: noop
          }
        },
        registry: { chainDecimals: [12], chainTokens: ['Unit'] },
        tx: {
          council: {
          }
        }
      },
      systemName: 'axlib'
    } as unknown as ApiProps;

    queueExtrinsic = jest.fn() as QueueTxExtrinsicAdd;
    const queue = {
      queueExtrinsic
    } as QueueProps;

    this.renderResult = render(
      <>
        <div id='tooltips' />
        <Suspense fallback='...'>
          <QueueProvider value={queue}>
            <MemoryRouter>
              <ThemeProvider theme={lightTheme}>
                <ApiContext.Provider value={mockApi}>
                  <AccountSidebar>
                    {React.cloneElement(this.overview, { onStatusChange: noop }) }
                  </AccountSidebar>
                </ApiContext.Provider>
              </ThemeProvider>
            </MemoryRouter>
          </QueueProvider>
        </Suspense>
      </>
    );
  }

  async getTable (): Promise<Table> {
    this.assertRendered();

    return new Table(await screen.findByRole('table'), this.rowClassName);
  }

  clearAccounts (): void {
    this.defaultAddresses.forEach((address) => keyring.forgetAccount(address));
  }

  protected assertRendered (): void {
    if (this.renderResult === undefined) {
      throw new NotYetRendered();
    }
  }
}
