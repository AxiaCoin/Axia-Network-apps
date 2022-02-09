// Copyright 2017-2021 @axia-js/app-sudo authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UseTranslationResponse } from 'react-i18next';

import { useTranslation as useTranslationBase } from 'react-i18next';

export function useTranslation (): UseTranslationResponse<'app-sudo'> {
  return useTranslationBase('app-sudo');
}
