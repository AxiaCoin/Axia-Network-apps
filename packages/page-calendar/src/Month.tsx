// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DateState, EntryInfo } from './types';

import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Button } from '@axia-js/react-components';

import { DAYS, MONTHS } from './constants';
import MonthDay from './MonthDay';
import { useTranslation } from './translate';

interface Props {
  className?: string;
  hasNextMonth: boolean;
  lastDay: number;
  now: Date;
  scheduled: EntryInfo[];
  setDay: (day: number) => void;
  setNextMonth: () => void;
  setPrevMonth: () => void;
  state: DateState;
}

function Month ({ className, hasNextMonth, lastDay, now, scheduled, setDay, setNextMonth, setPrevMonth, state: { dateMonth, dateSelected, days, startClass } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const dayOfWeekRef = useRef(DAYS.map((d) => t(d)));
  const monthRef = useRef(MONTHS.map((m) => t(m)));

  const [isCurrYear, isCurrMonth, isNowYear, isNowMonth, isOlderMonth] = useMemo(
    () => [
      dateMonth.getFullYear() === dateSelected.getFullYear(),
      dateMonth.getMonth() === dateSelected.getMonth(),
      now.getFullYear() === dateMonth.getFullYear(),
      now.getMonth() === dateMonth.getMonth(),
      now.getMonth() > dateMonth.getMonth()
    ],
    [dateMonth, dateSelected, now]
  );

  return (
    <div className={className}>
      <h1>
        <Button.Group className='CustomAlign2'>
          <Button
            className=''
            icon='arrow-left'
            // isDisabled={isNowYear && (isOlderMonth || isNowMonth)}
            onClick={setPrevMonth}
          />
        </Button.Group>
        <div className='CustomMonthYear'>{monthRef.current[dateMonth.getMonth()]} {dateMonth.getFullYear()}</div>
        <Button.Group className='CustomAlign'>
          <Button
            className=''
            icon='arrow-right'
            isDisabled={!hasNextMonth}
            onClick={setNextMonth}
          />
        </Button.Group>
      </h1>
      <div className={`calendar ${startClass}`}>
        <div className='dayOfWeek'>
          {dayOfWeekRef.current.map((day): React.ReactNode => (
            <div key={day}>{t(day)}</div>
          ))}
        </div>
        <div className='dateGrid'>
          {days.map((day): React.ReactNode => (
            <MonthDay
              dateMonth={dateMonth}
              day={day}
              isCurrent={isCurrYear && isCurrMonth && day === dateSelected.getDate()}
              isDisabled={(isNowYear && (isOlderMonth || (isNowMonth && now.getDate() > day))) || (!hasNextMonth && day > lastDay)}
              key={day}
              scheduled={scheduled}
              setDay={setDay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Month)`
  flex: 0;
  max-width: max-content;

  h1{
    width:100%;
  }

  .CustomAlign{
    text-align:right;
  }
  
  .CustomAlign2{
    text-align:left;
  }
  
  .ui--Button:not(.isDisabled):not(.isIcon):not(.isBasic) .ui--Icon, .ui--Button.withoutLink:not(.isDisabled) .ui--Icon{
    background:#B1B5C4 !important;
    border-radius:40px;
    color:#fff;
  }

  .CustomMonthYear{
    text-transform: capitalize;
    font-weight: 600;
    margin-top: -12px;
    font-size: 20px;
    word-wrap: normal;
    width: 120%;

  }

  .calendar {
    padding: 1rem 1.5rem;

    .dateGrid,
    .dayOfWeek {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .dateGrid {
      margin-top: 0.5em;
    }

    &.startSun .dateGrid .day:first-child { grid-column: 1 }
    &.startMon .dateGrid .day:first-child { grid-column: 2 }
    &.startTue .dateGrid .day:first-child { grid-column: 3 }
    &.startWed .dateGrid .day:first-child { grid-column: 4 }
    &.startThu .dateGrid .day:first-child { grid-column: 5 }
    &.startFri .dateGrid .day:first-child { grid-column: 6 }
    &.startSat .dateGrid .day:first-child { grid-column: 7 }

    .dayOfWeek {
      > * {
        font-size: 0.7em;
        font-weight: var(--font-weight-normal);
        letter-spacing: 0.1em;
        text-align: center;
        text-transform: uppercase;
      }
    }

    .monthIndicator {
      align-items: center;
      display: flex;
      font-size: 1.25rem;
      justify-content: space-between;
    }
  }
`);
