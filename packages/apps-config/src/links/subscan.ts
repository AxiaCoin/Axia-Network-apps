// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    'Acala Mandala TC5': 'acala-testnet',
    'Bifrost Asgard Nightly': 'bifrost',
    'Centrifuge Mainnet': 'centrifuge',
    ChainX: 'chainx',
    'Crust Maxwell': 'crust',
    'Darwinia CC1': 'darwinia-cc1',
    'Darwinia Crab': 'crab',
    Edgeware: 'edgeware',
    Equilibrium: 'equilibrium',
    'KILT Peregrine': 'kilt-testnet',
    'KILT Spiritnet': 'spiritnet',
    Karura: 'karura',
    Kulupu: 'kulupu',
    AXIALunar: 'axialunar',
    'Laminar Turbulence TC2': 'laminar-testnet',
    'Phala PoC-4': 'phala',
    Plasm: 'plasm',
    AXIA: 'axia',
    BetaNet: 'betanet',
    Shiden: 'shiden',
    Stafi: 'stafi',
    AlphaNet: 'alphanet'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.subscan.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.subscan as string,
  paths: {
    address: 'account',
    block: 'block',
    council: 'council',
    extrinsic: 'extrinsic',
    proposal: 'democracy_proposal',
    referendum: 'referenda',
    techcomm: 'tech',
    treasury: 'treasury'
  },
  url: 'https://subscan.io/'
};
