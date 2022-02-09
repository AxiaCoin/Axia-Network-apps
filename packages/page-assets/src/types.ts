// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AssetDetails, AssetId, AssetMetadata } from '@axia-js/types/interfaces';

export interface AssetInfo {
  details: AssetDetails | null;
  id: AssetId;
  isAdminMe: boolean;
  isIssuerMe: boolean;
  isFreezerMe: boolean;
  isOwnerMe: boolean;
  key: string;
  metadata: AssetMetadata | null;
}

export interface AssetInfoComplete extends AssetInfo {
  details: AssetDetails;
  metadata: AssetMetadata;
}
