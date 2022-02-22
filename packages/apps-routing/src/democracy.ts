// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component, { useCounter } from '@axia-js/app-democracy';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.democracy.notePreimage'
      ]
    },
    group: 'governance',
    icon: 'check-circle',
    name: 'democracy',
    text: t('nav.democracy', 'Democracy', { ns: 'apps-routing' }),
    useCounter
  };
}
