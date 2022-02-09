// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-allychains';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        // children - allychainInfo.arachainId / allychainUpgrade.didSetValidationCode
        ['query.paras.allychains']
      ]
    },
    group: 'network',
    icon: 'link',
    name: 'allychains',
    text: t('nav.allychains', 'Allychains', { ns: 'apps-routing' })
  };
}
