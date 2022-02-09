// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Proposal } from '@axia-js/types/interfaces';

export function isTreasuryProposalVote (proposal?: Proposal | null): boolean {
  if (!proposal) {
    return false;
  }

  const { method, section } = proposal.registry.findMetaCall(proposal.callIndex);

  return section === 'treasury' &&
    ['approveProposal', 'rejectProposal'].includes(method) &&
    !!proposal.args[0];
}
