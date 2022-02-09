// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveDispatch } from '@axia-js/api-derive/types';

import React from 'react';

import { LinkExternal } from '@axia-js/react-components';
import { useBestNumber } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';

import PreImageButton from '../Overview/PreImageButton';
import ProposalCell from '../Overview/ProposalCell';

interface Props {
  value: DeriveDispatch;
}

function DispatchEntry ({ value: { at, image, imageHash, index } }: Props): React.ReactElement<Props> {
  const bestNumber = useBestNumber();

  return (
    <tr>
      <td className='number'><h1>{formatNumber(index)}</h1></td>
      <ProposalCell
        imageHash={imageHash}
        proposal={image?.proposal}
      />
      <td className='number together'>
        {bestNumber && (
          <>
            <BlockToTime value={at.sub(bestNumber)} />
            #{formatNumber(at)}
          </>
        )}
      </td>
      <td className='button'>
        {!image?.proposal && (
          <PreImageButton
            imageHash={imageHash}
            isImminent
          />
        )}
      </td>
      <td className='links media--1000'>
        <LinkExternal
          data={index}
          isLogo
          type='referendum'
        />
      </td>
    </tr>
  );
}

export default React.memo(DispatchEntry);
