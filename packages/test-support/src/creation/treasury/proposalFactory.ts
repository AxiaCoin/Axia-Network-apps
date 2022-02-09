// Copyright 2017-2020 @axia-js/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@axia-js/api-derive/types';

import { ApiPromise } from '@axia-js/api';
import { SubmittableExtrinsic } from '@axia-js/api/types';
import { aHash } from '@axia-js/test-support/creation/hashes';
import { alice, bob } from '@axia-js/test-support/keyring/addresses';

export interface ProposalFactory {
  aProposal: (extrinsic: SubmittableExtrinsic<'promise'>, ayes?: string[], nays?: string[]) => DeriveCollectiveProposal
}

export function proposalFactory (api: ApiPromise): ProposalFactory {
  const registry = api.registry;

  return {
    aProposal: (extrinsic, ayes = [alice], nays = [bob]) => ({
      hash: aHash(),
      proposal: registry.createType('Proposal', extrinsic),
      votes: registry.createType('Votes', {
        ayes: ayes,
        index: 0,
        nays: nays,
        threshold: 4
      })
    })
  };
}
