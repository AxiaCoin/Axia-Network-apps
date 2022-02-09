// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSocietyCandidate } from '@axia-js/api-derive/types';
import type { AccountId, Balance, BlockNumber, SocietyVote, StrikeCount } from '@axia-js/types/interfaces';

export interface MapMember {
  accountId: AccountId;
  isCandidateVoter: boolean;
  isDefenderVoter: boolean
  isFounder: boolean;
  isHead: boolean;
  isSkeptic: boolean;
  isSuspended: boolean;
  isWarned: boolean;
  key: string;
  strikes: StrikeCount;
  payouts: [BlockNumber, Balance][];
}

export interface OwnMembers {
  allMembers: string[];
  isMember: boolean;
  ownMembers: string[];
}

export type VoteType = [string, SocietyVote];

export interface VoteSplit {
  allAye: VoteType[];
  allNay: VoteType[];
  allSkeptic: VoteType[];
}

export interface Voters {
  candidates?: DeriveSocietyCandidate[];
  skeptics?: string[];
  voters?: string[];
}
