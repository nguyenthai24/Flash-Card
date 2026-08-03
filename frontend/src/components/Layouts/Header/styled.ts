'use client';

import { Box, BoxProps, createPolymorphicComponent, Text, TextProps } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  height: ${(props) => props.theme.sizes.HEADER_HEIGHT};
  box-shadow: ${(props) => props.theme.shadows.SHADOW_TABLE};
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.BG_HEADER};

  /* .mantine-Anchor-root.mantine-Text-root {
    &[data-underline='always'] {
      color: ${(props) => props.theme.colors.PRIMARY} !important;
      font-weight: 500;
    }
  } */
`);
