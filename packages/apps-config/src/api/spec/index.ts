// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types';

import chainx from './chainx';
import axccanarynet from './axccanarynet';

import pontem from './pontem';
import axctestnet from './axctestnet';

// NOTE: The mapping is done from specName in state.getRuntimeVersion
const spec: Record<string, OverrideBundleDefinition> = {
  chainx,
  'chainx-allychain': chainx,

  axccanarynet,
  'axccanarynet-node': axccanarynet,

  axctestnet,
  'axctestnet-node': axctestnet,

  pontem,
  'pontem-node': pontem,
};

export default spec;

// TODO:
