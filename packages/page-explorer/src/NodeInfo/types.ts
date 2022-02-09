// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Vec } from '@axia-js/types';
import type { BlockNumber, Extrinsic, Health, PeerInfo } from '@axia-js/types/interfaces';

export interface Info {
  blockNumber?: BlockNumber;
  extrinsics?: Vec<Extrinsic> | null;
  health?: Health | null;
  peers?: PeerInfo[] | null;
}
