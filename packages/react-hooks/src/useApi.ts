// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiProps } from '@axia-js/react-api/types';

import { useContext } from 'react';

import { ApiContext } from '@axia-js/react-api';

export function useApi (): ApiProps {
  return useContext(ApiContext);
}
