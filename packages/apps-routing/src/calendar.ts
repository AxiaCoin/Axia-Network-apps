// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-calendar';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'network',
    icon: 'calendar-alt',
    name: 'calendar',
    text: t('nav.calendar', 'Event calendar', { ns: 'apps-routing' })
  };
}
