// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { keyring } from '@axia-js/ui-keyring';
import { assert, hexToU8a, isHex } from '@axia-js/util';
import { ethereumEncode } from '@axia-js/util-crypto';

export function toAddress (value?: string | Uint8Array | null, allowIndices = false): string | undefined {
  if (value) {
    try {
      const u8a = isHex(value)
        ? hexToU8a(value)
        : keyring.decodeAddress(value);

      assert(allowIndices || u8a.length === 32 || u8a.length === 20, 'AccountIndex values not allowed');

      if (u8a.length === 20) {
        return ethereumEncode(u8a);
      } else {
        return keyring.encodeAddress(u8a);
      }
    } catch (error) {
      // noop, undefined return indicates invalid/transient
    }
  }

  return undefined;
}
