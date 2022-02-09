// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableResult } from '@axia-js/api';
import type { Signer, SignerResult } from '@axia-js/api/types';
import type { QueueTxMessageSetStatus, QueueTxPayloadAdd, QueueTxStatus } from '@axia-js/react-components/Status/types';
import type { Hash } from '@axia-js/types/interfaces';
import type { Registry, SignerPayloadJSON } from '@axia-js/types/types';

export default class ApiSigner implements Signer {
  readonly #queuePayload: QueueTxPayloadAdd;
  readonly #queueSetTxStatus: QueueTxMessageSetStatus;
  readonly #registry: Registry;

  constructor (registry: Registry, queuePayload: QueueTxPayloadAdd, queueSetTxStatus: QueueTxMessageSetStatus) {
    this.#queuePayload = queuePayload;
    this.#queueSetTxStatus = queueSetTxStatus;
    this.#registry = registry;
  }

  public async signPayload (payload: SignerPayloadJSON): Promise<SignerResult> {
    return new Promise((resolve, reject): void => {
      this.#queuePayload(this.#registry, payload, (id: number, result: SignerResult | null): void => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Unable to sign'));
        }
      });
    });
  }

  public update (id: number, result: Hash | SubmittableResult): void {
    if (result instanceof this.#registry.createClass('Hash')) {
      this.#queueSetTxStatus(id, 'sent', result.toHex());
    } else {
      this.#queueSetTxStatus(id, result.status.type.toLowerCase() as QueueTxStatus, status);
    }
  }
}
