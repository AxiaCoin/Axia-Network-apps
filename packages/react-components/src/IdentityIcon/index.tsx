// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IdentityProps } from '@axia-js/react-identicon/types';
import type { AccountId, AccountIndex, Address } from '@axia-js/types/interfaces';

import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { getSystemIcon } from '@axia-js/apps-config';
import { ThemeProps } from '@axia-js/react-components/types';
import { useApi } from '@axia-js/react-hooks';
import BaseIdentityIcon from '@axia-js/react-identicon';
import { settings } from '@axia-js/ui-settings';

import StatusContext from '../Status/Context';
import { useTranslation } from '../translate';
import RoboHash from './RoboHash';

interface Props {
  className?: string;
  prefix?: IdentityProps['prefix'];
  size?: number;
  theme?: IdentityProps['theme'] | 'robohash';
  value?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

export function getIdentityTheme (systemName: string, specName: string): 'axlib' {
  return ((settings.icon === 'default' && getSystemIcon(systemName, specName)) || settings.icon) as 'axlib';
}

function isCodec (value?: AccountId | AccountIndex | Address | string | Uint8Array | null): value is AccountId | AccountIndex | Address {
  return !!(value && (value as AccountId).toHuman);
}

function IdentityIcon ({ className = '', prefix, size = 24, theme, value }: Props): React.ReactElement<Props> {
  const { isEthereum, specName, systemName } = useApi();
  const { t } = useTranslation();
  const { queueAction } = useContext(StatusContext);
  const thisTheme = theme || getIdentityTheme(systemName, specName);
  const Custom = thisTheme === 'robohash'
    ? RoboHash
    : undefined;

  const _onCopy = useCallback(
    (account: string) => queueAction({
      account,
      action: t('clipboard'),
      message: t('address copied'),
      status: 'queued'
    }),
    [queueAction, t]
  );

  return (
    <BaseIdentityIcon
      Custom={Custom}
      className={className}
      onCopy={_onCopy}
      prefix={prefix}
      size={size}
      theme={isEthereum ? 'ethereum' : thisTheme as 'axlib'}
      value={isCodec(value) ? value.toString() : value}
    />
  );
}

export default React.memo(styled(IdentityIcon)(({ theme }: ThemeProps) => `
  ${theme.theme === 'dark'
    ? `circle:first-child {
      fill: #282829;
    }`
    : ''}

  border: 1px solid ${theme.theme === 'dark' ? 'transparent' : '#ddd'};
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
`));
