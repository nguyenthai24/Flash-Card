import { Button } from '@mantine/core';
import styled from 'styled-components';
import { ink, focusRing } from '../../common/tokens';

export const PrimaryButton = styled(Button)`
  &:hover:not([data-disabled]) {
    background: #b2cba8 !important;
    transform: translate(-1px, -1px);
    box-shadow: 4px 5px 0 ${ink} !important;
  }

  &[data-disabled] {
    border-color: #cfc8b5 !important;
    background: #ece8d8 !important;
    box-shadow: none !important;
    color: #8a8578 !important;
    cursor: not-allowed;
  }

  &:focus-visible {
    ${focusRing}
  }
`;
