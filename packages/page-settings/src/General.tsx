// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@axia-js/apps-config/settings/types';
import type { SettingsStruct } from '@axia-js/ui-settings/types';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { createLanguages, createSs58 } from '@axia-js/apps-config';
import { allNetworks } from '@axia-js/networks';
import { Button, Dropdown, MarkWarning } from '@axia-js/react-components';
import { useApi, useLedger } from '@axia-js/react-hooks';
import { settings } from '@axia-js/ui-settings';
import { isUndefined } from '@axia-js/util';

import { useTranslation } from './translate';
import { createIdenticon, createOption, save, saveAndReload } from './util';

interface Props {
  className?: string;
}

const ledgerConnOptions = settings.availableLedgerConn;

function General ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isApiReady } = useApi();
  const { isLedgerCapable } = useLedger();
  // tri-state: null = nothing changed, false = no reload, true = reload required
  const [changed, setChanged] = useState<boolean | null>(null);
  const [state, setSettings] = useState((): SettingsStruct => {
    const values = settings.get();

    return { ...values, uiTheme: values.uiTheme === 'dark' ? 'dark' : 'light' };
  });

  const iconOptions = useMemo(() => {
      const tempIconOptions = settings.availableIcons
      .map((o): Option => createIdenticon(o, ['default']))
      .concat(createIdenticon({ info: 'robohash', text: 'RoboHash', value: 'robohash' }))
      return tempIconOptions.filter(({ value })=> ["axia", "default"].includes(value));
    },[]);

  const prefixOptions = useMemo(
    (): (Option | React.ReactNode)[] => {
      let ss58Format = api.registry.chainSS58;

      if (isUndefined(ss58Format)) {
        ss58Format = 42;
      }

      const network = allNetworks.find(({ prefix }) => prefix === ss58Format);

      return createSs58(t).map((o) =>
        createOption(o, ['default'], 'empty', (
          o.value === -1
            ? isApiReady
              ? network
                ? ` (${network.displayName}, ${ss58Format || 0})`
                : ` (${ss58Format || 0})`
              : undefined
            : ` (${o.value})`
        ))
      );
    },
    [api, isApiReady, t]
  );

  const themeOptions = useMemo(
    () => [
      { text: t('Light theme (default)'), value: 'light' },
      { text: t('Dark theme (experimental, work-in-progress)'), value: 'dark' }
    ],
    [t]
  );

  const translateLanguages = useMemo(
    () => createLanguages(t),
    [t]
  );

  useEffect((): void => {
    const prev = settings.get() as unknown as Record<string, unknown>;
    const hasChanges = Object.entries(state).some(([key, value]) => prev[key] !== value);
    const needsReload = prev.apiUrl !== state.apiUrl || prev.prefix !== state.prefix;

    setChanged(
      hasChanges
        ? needsReload
        : null
    );
  }, [state]);

  const _handleChange = useCallback(
    (key: keyof SettingsStruct) => <T extends string | number>(value: T) =>
      setSettings((state) => ({ ...state, [key]: value })),
    []
  );

  const _saveAndReload = useCallback(
    () => saveAndReload(state),
    [state]
  );

  const _save = useCallback(
    (): void => {
      save(state);
      setChanged(null);
    },
    [state]
  );

  const { i18nLang, icon, ledgerConn, prefix, uiTheme } = state;

  return (
    <div className={className}>
      {/* <div className='ui--row'>
        <Dropdown
          defaultValue={prefix}
          help={t<string>('Override the default ss58 prefix for address generation')}
          label={t<string>('address prefix')}
          onChange={_handleChange('prefix')}
          options={prefixOptions}
        />
      </div> */}
      <div className='ui--row'>
        <Dropdown
          defaultValue={icon}
          help={t<string>('Override the default identity icon display with a specific theme')}
          label={t<string>('default icon theme')}
          onChange={_handleChange('icon')}
          options={iconOptions}
        />
      </div>
      {/* <div className='ui--row'>
        <Dropdown
          defaultValue={uiTheme}
          label={t<string>('default interface theme')}
          onChange={_handleChange('uiTheme')}
          options={themeOptions}
        />
      </div> */}
      {/* <div className='ui--row'>
        <Dropdown
          defaultValue={i18nLang}
          label={t<string>('default interface language')}
          onChange={_handleChange('i18nLang')}
          options={translateLanguages}
        />
      </div> */}
      {isLedgerCapable && (
        <>
          <div className='ui--row'>
            <Dropdown
              defaultValue={ledgerConn}
              help={t<string>('Manage your connection to Ledger S')}
              label={t<string>('manage hardware connections')}
              onChange={_handleChange('ledgerConn')}
              options={ledgerConnOptions}
            />
          </div>  
          {state.ledgerConn !== 'none' && (
            <div className='ui--row'>
              <MarkWarning content={t<string>('Ledger support is still experimental and some issues may remain. Trust, but verify the addresses on your devices before transferring large amounts. There are some features that will not work, including batch calls (used extensively in staking and democracy) as well as any identity operations.')} />
            </div>
          )}
        </>
      )}
      <Button.Group>
        <Button
          icon='save'
          isDisabled={changed === null}
          label={
            changed
              ? t<string>('Save & Reload')
              : t<string>('Save')
          }
          onClick={
            changed
              ? _saveAndReload
              : _save
          }
        />
      </Button.Group>
    </div>
  );
}

export default React.memo(styled(General)`
  .ui.selection.dropdown{
    background: #FFFFFF !important;
    // border: 2px solid #B1B5C4;
    box-sizing: border-box;
    border-radius: 12px !important;
  }
  .ui--Dropdown-item {

    position: relative;
      white-space: nowrap;
    background: none !important;
    border: none !important;
    border-radius: 12px;
    
    }
  .ui--Button:not(.isDisabled):not(.isIcon):not(.isBasic) .ui--Icon, .ui--Button.withoutLink:not(.isDisabled) .ui--Icon{
    background:#178FE1 !important;
    color:#fff !important;
  }
  .ui-Icon:hover{
    background:red !important;
  }
  .WnYpr.hasLabel{
    color:##178FE1 !important;
    font-weight:500;
  }
  button.ui--Button{
    color: #fff;
  }
  button.ui--Button:hover{
    color: #fff !important;
    background:#178FE1 !important;
  }
`);
