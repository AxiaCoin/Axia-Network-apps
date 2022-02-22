// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ComponentProps as Props } from './types';

import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useModal } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';
import { useModuleElections } from '../useModuleElections';

function SubmitCandidacy ({ electionsInfo }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const { t } = useTranslation();
  const [accountId, setAcountId] = useState<string | null>(null);
  const { isOpen, onClose, onOpen } = useModal();
  const modLocation = useModuleElections();

  if (!modLocation) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <Modal
          header={t<string>('Submit your council candidacy')}
          onClose={onClose}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns hint={t<string>('This account will appear in the list of candidates. With enough votes in an election, it will become either a runner-up or a council member.')}>
              <InputAddress
                help={t<string>('Select the account you wish to submit for candidacy.')}
                label={t<string>('candidate account')}
                onChange={setAcountId}
                type='account'
              />
            </Modal.Columns>
            {api.consts[modLocation] && (
              <Modal.Columns hint={t('The bond will be reserved for the duration of your candidacy and membership.')}>
                <InputBalance
                  defaultValue={api.consts[modLocation].candidacyBond}
                  help={t<string>('The bond that is reserved')}
                  isDisabled
                  label={t<string>('candidacy bond')}
                />
              </Modal.Columns>
            )}
          </Modal.Content>
          <Modal.Actions>
            <TxButton
              accountId={accountId}
              isDisabled={!electionsInfo}
              onStart={onClose}
              params={
                api.tx[modLocation].submitCandidacy.meta.args.length === 1
                  ? [electionsInfo?.candidates.length]
                  : []
              }
              tx={api.tx[modLocation].submitCandidacy}
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='plus'
        isDisabled={!electionsInfo}
        label={t<string>('Submit candidacy')}
        onClick={onOpen}
      />
    </>
  );
}

export default React.memo(styled(SubmitCandidacy)`
  // button.ui--Button{
  //   color:red !important;
  // }
`);
