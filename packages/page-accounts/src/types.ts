// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { ActionStatus } from '@axia-js/react-components/Status/types';
import type { Balance, Conviction } from '@axia-js/types/interfaces';
import type { KeyringAddress } from '@axia-js/ui-keyring/types';

import { WithTranslation } from 'react-i18next';

export { AppProps as ComponentProps } from '@axia-js/react-components/types';

export interface BareProps {
  className?: string;
}

export interface I18nProps extends BareProps, WithTranslation {}

export interface ModalProps {
  onClose: () => void;
  onStatusChange: (status: ActionStatus) => void;
}

export interface Delegation {
  accountDelegated: string
  amount: Balance
  conviction: Conviction
}

export interface SortedAccount {
  account?: KeyringAddress;
  address: string;
  delegation?: Delegation;
  isFavorite: boolean;
}

export interface AccountBalance {
  total: BN;
  locked: BN;
  transferrable: BN;
  bonded: BN;
  redeemable: BN;
  unbonding: BN;
}

export type PairType = 'ecdsa' | 'ed25519' | 'ed25519-ledger' | 'ethereum' | 'sr25519';

export interface CreateProps extends ModalProps {
  className?: string;
  onClose: () => void;
  onStatusChange: (status: ActionStatus) => void;
  seed?: string;
  type?: PairType;
}

export type SeedType = 'bip' | 'raw' | 'dev';

export interface AddressState {
  address: string | null;
  derivePath: string;
  deriveValidation?: DeriveValidationOutput
  isSeedValid: boolean;
  pairType: PairType;
  seed: string;
  seedType: SeedType;
}

export interface CreateOptions {
  genesisHash?: string;
  name: string;
  tags?: string[];
}

export interface DeriveValidationOutput {
  error?: string;
  warning?: string;
}
