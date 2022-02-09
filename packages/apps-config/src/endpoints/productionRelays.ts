// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { createAXIALunar } from './productionRelayAXIALunar';
import { createAXIA } from './productionRelayAXIA';
import { expandEndpoints } from './util';

export function createAXIALunarRelay (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [createAXIALunar(t)], firstOnly, withSort);
}

export function createAXIARelay (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [createAXIA(t)], firstOnly, withSort);
}
