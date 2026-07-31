import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const SidebarWrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  min-height: calc(100vh - ${(props) => props.theme.sizes.HEADER_HEIGHT}) !important;
  width: ${(props) => props.theme.sizes.SIDEBAR_WIDTH};
  flex-shrink: 0;
  position: relative;
  background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};

  .vihub-NavLink-root {
    --vihub-NavLink-root-margin: 1.2rem;
    margin: 0 var(--vihub-NavLink-root-margin);
    max-width: calc(100% - var(--vihub-NavLink-root-margin) * 2);
    height: 4.4rem;
    background-color: transparent;

    &:hover {
      .vihub-NavLink-label {
        color: ${(props) => props.theme.colors.PRIMARY};
      }
    }

    &[data-active='true'] {
      border-radius: 0 999px 999px 0;
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};

      .vihub-NavLink-label {
        font-weight: 500;
        color: ${(props) => props.theme.colors.PRIMARY};
      }

      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        width: 4px;
        height: 3.2rem;
        background-color: ${(props) => props.theme.colors.PRIMARY};
        border-radius: 0 999px 999px 0;
      }
    }
  }

  .vihub-NavLink-label {
    font-size: 1.6rem;
  }
`);
