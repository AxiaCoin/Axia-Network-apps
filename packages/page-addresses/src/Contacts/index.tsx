// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ComponentProps as Props } from '../types';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button, FilterInput, SummaryBox, Table } from '@axia-js/react-components';
import { useAddresses, useFavorites, useLoadingDelay, useToggle } from '@axia-js/react-hooks';

import CreateModal from '../modals/Create';
import { useTranslation } from '../translate';
import Address from './Address';

type SortedAddress = { address: string; isFavorite: boolean };

const STORE_FAVS = 'accounts:favorites';

function Overview ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { allAddresses } = useAddresses();
  const [isCreateOpen, toggleCreate] = useToggle(false);
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS);
  const [sortedAddresses, setSortedAddresses] = useState<SortedAddress[] | undefined>();
  const [filterOn, setFilter] = useState<string>('');
  const isLoading = useLoadingDelay();

  const headerRef = useRef([
    [t('contacts'), 'start', 2],
    [t('transactions'), 'number media--1500'],
    [t('balances'), 'balances'],
    [undefined, 'media--1400'],
    []
  ]);

  useEffect((): void => {
    setSortedAddresses(
      allAddresses
        .map((address): SortedAddress => ({ address, isFavorite: favorites.includes(address) }))
        .sort((a, b): number =>
          a.isFavorite === b.isFavorite
            ? 0
            : b.isFavorite
              ? 1
              : -1
        )
    );
  }, [allAddresses, favorites]);

  return (
    <div className={className}>
      {isCreateOpen && (
        <CreateModal
          onClose={toggleCreate}
          onStatusChange={onStatusChange}
        />
      )}
      <SummaryBox className='summary-box-contacts'>
        <section>
          <FilterInput
            filterOn={filterOn}
            label={t<string>('filter by name or tags')}
            setFilter={setFilter}
            className='customInput'
          />
        </section>
        <Button.Group>
          <Button
            icon='plus-square'
            label={t<string>('Add contact')}
            onClick={toggleCreate}
            className='customAdd'
          />
        </Button.Group>
      </SummaryBox>
      <Table
        empty={!isLoading && sortedAddresses && t<string>('No funds staked yet. Bond funds to validate or nominate a validator')}
        header={headerRef.current}
        withCollapsibleRows
      >
        {!isLoading && sortedAddresses?.map(({ address, isFavorite }): React.ReactNode => (
          <Address
            address={address}
            filter={filterOn}
            isFavorite={isFavorite}
            key={address}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(styled(Overview)`
  .summary-box-contacts {
    align-items: center;
  }
  .customAdd{
    color: #178FE1;
    font-weight:500;
  }
  .customInput{
    width:80rem;
  }
  .customInput input{
    border: 2px solid #B1B5C4 !important;
    border-radius: 12px;
    background: #FFFFFF;
    
  }
  .summary-box-contacts{
    margin:0px !important;
  }
`);
