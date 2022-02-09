// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import { useScroll } from '@axia-js/react-hooks/useScroll';
import { useWindowSize } from '@axia-js/react-hooks/useWindowSize';

export interface ElementPosition {
  x: number,
  y: number,
  width: number,
  height: number,
}

export function useElementPosition (ref: React.MutableRefObject<HTMLElement | undefined | null>): ElementPosition | undefined {
  const [elementPosition, setElementPosition] = useState<ElementPosition>();
  const windowSize = useWindowSize();
  const scrollY = useScroll();

  useEffect(() => {
    if (ref && ref.current) {
      const { height, width, x, y } = ref.current?.getBoundingClientRect();

      setElementPosition({
        height,
        width,
        x,
        y
      });
    }
  }, [ref, scrollY, windowSize]);

  return elementPosition;
}
