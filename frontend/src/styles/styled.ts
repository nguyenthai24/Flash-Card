'use client';

import { Button } from '@mantine/core';
import styled from 'styled-components';

export const StyledButtonOutline = styled(Button)`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.BORDER_DEFAULT};
  color: ${({ theme }) => theme.colors.WHITE};

  &:hover {
    background-color: ${({ theme }) => theme.colors.BG_BUTTON_HOVER};
    color: ${({ theme }) => theme.colors.WHITE};
  }
`;
