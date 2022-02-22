// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import EditButton from './EditButton';
import InputTags from './InputTags';
import Tag from './Tag';
import { useTranslation } from './translate';

interface Props {
  children?: React.ReactNode;
  className?: string;
  isEditable?: boolean;
  isEditing?: boolean;
  onChange?: (_: string[]) => void;
  onToggleIsEditing?: () => void;
  onSave?: () => void;
  value: string[];
  withEditButton?: boolean;
  withTitle?: boolean;
}

function Tags ({ children, className = '', isEditable, isEditing, onChange, onSave, onToggleIsEditing, value, withEditButton = true, withTitle }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const contents = useMemo(
    () => value.length
      ? value.map((tag): React.ReactNode => (
        <Tag
          key={tag}
          label={tag}
        />
      ))
      : <label>{t<string>('no tags')}</label>,
    [t, value]
  );

  const _onSave = useCallback(
    (): void => {
      onSave && onSave();
      onToggleIsEditing && onToggleIsEditing();
    },
    [onSave, onToggleIsEditing]
  );

  return (
    <div className={`ui--Tags ${className}`}>
      {withTitle && (
        <h5>{t<string>('Tags')}</h5>
      )}
      {isEditable && isEditing
        ? (
          <InputTags
            defaultValue={value}
            onBlur={_onSave}
            onChange={onChange}
            onClose={_onSave}
            openOnFocus
            searchInput={{ autoFocus: false }}
            value={value}
            withLabel={false}
          />
        )
        : isEditable && withEditButton
          ? (
            <EditButton
              className={value.length === 0 ? 'center' : 'left'}
              onClick={onToggleIsEditing}
            >
              {contents}
            </EditButton>
          )
          : contents
      }
      {children}
    </div>
  );
}

export default React.memo(styled(Tags)`
  h5 {
    font-style: normal;
    font-weight: 700;
    font-size: 0.714rem;
    line-height: 1rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  &.CustomH5{
    margin-left:20px;
    margin-bottom:0px !important;
  }

  &.CustomH5 h5{
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;    
    color: #353945;
    text-transform: capitalize !important;

  }

  &.CustomH5 label{
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #777E91;
    text-transform: capitalize !important;

  }

  label {
    display: inline-block;
  }

  .ui--EditButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &.center {
      justify-content: center;
    }

    &.left {
      justify-content: left;
    }
  }

  .ui--Tag {
    margin: 0.1rem 0 0.1rem 0.571rem;
  }
`);
