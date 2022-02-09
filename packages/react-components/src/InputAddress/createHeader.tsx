// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringSectionOption } from '@axia-js/ui-keyring/options/types';

import React from 'react';

import Dropdown from '../Dropdown';

export default function createHeader (option: KeyringSectionOption): React.ReactNode {
  return (
    <Dropdown.Header
      content={option.name}
      key={option.key || option.name}
    />
  );
}
