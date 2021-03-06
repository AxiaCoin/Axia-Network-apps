// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AssetDetails, AssetId, AssetMetadata } from '@axia-js/types/interfaces';

import React from 'react';

import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';

import { useTranslation } from '../../translate';
import Modal from './Mint';

interface Props {
  className?: string;
  details: AssetDetails;
  id: AssetId;
  metadata: AssetMetadata;
}

function Mint ({ className, details, id, metadata }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <Button
        icon='plus'
        isDisabled={metadata.isFrozen.isTrue}
        label={t<string>('Mint')}
        onClick={toggleOpen}
      />
      {isOpen && (
        <Modal
          className={className}
          details={details}
          id={id}
          metadata={metadata}
          onClose={toggleOpen}
        />
      )}
    </>
  );
}

export default React.memo(Mint);
