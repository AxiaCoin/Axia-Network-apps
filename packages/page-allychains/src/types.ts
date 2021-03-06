// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId, AuctionIndex, BalanceOf, BlockNumber, FundInfo, HrmpChannel, HrmpChannelId, LeasePeriodOf, AllychainProposal, ParaId, ParaInfo, SessionIndex } from '@axia-js/types/interfaces';

export type ChannelMap = Record<string, [HrmpChannelId, HrmpChannel][]>;

export interface AllChannels {
  dst: ChannelMap;
  src: ChannelMap;
}

export interface LeaseInfo {
  accountId: AccountId;
  balance: BalanceOf;
  period: number;
}

export interface QueuedAction {
  paraIds: ParaId[];
  sessionIndex: BN;
}

export interface AuctionInfo {
  endBlock: BlockNumber | null;
  leasePeriod: LeasePeriodOf | null;
  numAuctions: AuctionIndex;
}

export interface ProposalExt {
  id: ParaId;
  isApproved: boolean;
  isScheduled: boolean;
  proposal?: AllychainProposal;
}

export interface ScheduledProposals {
  scheduledIds: ParaId[];
  sessionIndex: SessionIndex;
}

export interface Campaigns {
  activeCap: BN;
  activeRaised: BN;
  funds: Campaign[] | null;
  totalCap: BN;
  totalRaised: BN;
}

export interface Campaign extends WinnerData {
  info: FundInfo;
  isCapped?: boolean;
  isEnded?: boolean;
  isWinner?: boolean;
}

export interface LeasePeriod {
  currentPeriod: BN;
  length: BN;
  progress: BN;
  remainder: BN;
}

export interface Proposals {
  approvedIds: ParaId[];
  proposalIds: ParaId[];
  scheduled: ScheduledProposals[];
}

export interface OwnedIdPartial {
  manager: string;
  paraId: ParaId;
  paraInfo: ParaInfo;
}

export interface OwnedId extends OwnedIdPartial {
  hasCode: boolean;
}

export interface OwnerInfo {
  accountId: string | null;
  paraId: number;
}

export interface WinnerData {
  accountId: string;
  firstSlot: BN;
  isCrowdloan: boolean;
  key: string;
  lastSlot: BN;
  paraId: ParaId;
  value: BN;
}

export interface Winning {
  blockNumber: BN;
  blockOffset: BN;
  total: BN;
  winners: WinnerData[];
}
