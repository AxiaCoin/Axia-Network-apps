// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function sanitize (value?: string): string {
  return value?.toLowerCase().replace(/-/g, ' ') || '';
}
