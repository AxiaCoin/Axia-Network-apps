// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import queryString from 'query-string';
import store from 'store';

import { createWsEndpoints } from '@axia-js/apps-config';
import { extractIpfsDetails } from '@axia-js/react-hooks/useIpfs';
import { settings } from '@axia-js/ui-settings';
import { assert } from '@axia-js/util';

function networkOrUrl (apiUrl: string): void {
  if (apiUrl.startsWith('light://')) {
    console.log('Light endpoint=', apiUrl.replace('light://', ''));
  } else {
    console.log('WS endpoint=', apiUrl);
  }
}

function getApiUrl (): string {
  // we split here so that both these forms are allowed
  //  - http://localhost:3000/?rpc=wss://axlib-rpc.axia.io/#/explorer
  //  - http://localhost:3000/#/explorer?rpc=wss://axlib-rpc.axia.io
  const urlOptions = queryString.parse(location.href.split('?')[1]);

  // if specified, this takes priority
  if (urlOptions.rpc) {
    assert(!Array.isArray(urlOptions.rpc), 'Invalid WS endpoint specified');

    // https://axia.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer;
    const url = decodeURIComponent(urlOptions.rpc.split('#')[0]);

    assert(url.startsWith('ws://') || url.startsWith('wss://') || url.startsWith('light://'), 'Non-prefixed ws/wss/light url');

    return url;
  }

  const endpoints = createWsEndpoints(<T = string>(): T => ('' as unknown as T));
  const { ipnsChain } = extractIpfsDetails();

  // check against ipns domains (could be expanded to others)
  if (ipnsChain) {
    const option = endpoints.find(({ dnslink }) => dnslink === ipnsChain);

    if (option) {
      return option.value;
    }
  }

  const stored = store.get('settings') as Record<string, unknown> || {};
  const fallbackUrl = endpoints.find(({ value }) => !!value);

  // via settings, or the default chain
  return [stored.apiUrl, process.env.WS_URL].includes(settings.apiUrl)
    ? settings.apiUrl // keep as-is
    : fallbackUrl
      ? fallbackUrl.value // grab the fallback
      : 'ws://127.0.0.1:9944'; // nothing found, go local
}

// There cannot be a Axlib Connect light client default (expect only jrpc EndpointType)
const apiUrl = getApiUrl();

// set the default as retrieved here
settings.set({ apiUrl });

networkOrUrl(apiUrl);
