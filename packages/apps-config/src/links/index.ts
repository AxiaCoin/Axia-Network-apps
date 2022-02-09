// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ExternalDef } from './types';

import Commonwealth from './commonwealth';
import Axcreasury from './axcreasury';
import AxcScanner from './axcscanner';
import Axiascan from './axcscan';
import { AxiassemblyIo, AxiassemblyNetwork } from './axcssembly';
import Axiastats from './axcstats';
import Statescan from './statescan';
import SubId from './subid';
import Subscan from './subscan';

export const externalLinks: Record<string, ExternalDef> = {
  Commonwealth,
  AxcScanner,
  Axcreasury,
  Axiascan,
  AxiassemblyIo,
  AxiassemblyNetwork,
  Axiastats,
  Statescan,
  SubId,
  Subscan
};
