// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId } from '@axia-js/types/interfaces';

import React, { useEffect, useRef, useState } from 'react';

import { AXIALUNAR_GENESIS } from '@axia-js/apps-config';
import { Button, Modal } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';

import drawCanary, { PADD, SIZE } from '../draw/canary';
import { useTranslation } from '../translate';

interface Props {
  accountId: AccountId;
}

const CANVAS_STYLE = {
  display: 'block',
  margin: '0 auto'
};

const HEIGHT = (SIZE * 2) + (PADD * 1);
const WIDTH = (SIZE * 3) + (PADD * 2);

function DesignAXIALunar ({ accountId }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [onAXIALunar] = useState(() => api.genesisHash.eq(AXIALUNAR_GENESIS));
  const [isShowing, toggleDesign] = useToggle();

  useEffect((): void => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        drawCanary(ctx, accountId);
      }
    }
  });

  if (!onAXIALunar) {
    return null;
  }

  return (
    <>
      <Button
        icon='pen-nib'
        onClick={toggleDesign}
      />
      {isShowing && (
        <Modal
          header={t('design samples')}
          onClose={toggleDesign}
          size='large'
        >
          <Modal.Content>
            <canvas
              height={HEIGHT}
              ref={canvasRef}
              style={CANVAS_STYLE}
              width={WIDTH}
            />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

export default React.memo(DesignAXIALunar);
