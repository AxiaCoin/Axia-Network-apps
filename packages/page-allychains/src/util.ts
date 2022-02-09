// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Codec } from '@axia-js/types/types';

export function sliceHex (value: Codec, max = 6): string {
  const hex = value.toHex();

  return hex.length > ((2 * max) + 2)
    ? `${hex.slice(0, max + 2)}…${hex.slice(-max)}`
    : hex === '0x'
      ? ''
      : hex;
}
