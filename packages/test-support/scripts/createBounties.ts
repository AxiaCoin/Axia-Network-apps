// Copyright 2017-2021 @axia-js/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createApi } from '@axia-js/test-support/api';
import { aliceSigner } from '@axia-js/test-support/keyring';

import { multiAcceptCurator, multiApproveBounty, multiAwardBounty, multiClaimBounty, multiProposeBounty, multiProposeCurator, multiWaitForBountyFunded, multiWaitForClaim } from './lib/multiFunctions';

(async () => {
  const api = await createApi(9944);

  const indexes = await multiProposeBounty(api, 6, aliceSigner());

  indexes.pop();
  await multiApproveBounty(api, indexes, aliceSigner());

  await multiWaitForBountyFunded(api, indexes);

  indexes.pop();
  await multiProposeCurator(api, indexes, aliceSigner());

  indexes.pop();
  await multiAcceptCurator(api, indexes, aliceSigner());

  indexes.pop();
  await multiAwardBounty(api, indexes, aliceSigner());

  await multiWaitForClaim(api, indexes);

  indexes.pop();
  await multiClaimBounty(api, indexes, aliceSigner());

  await api.disconnect();
})().catch((err) => console.error(err));
