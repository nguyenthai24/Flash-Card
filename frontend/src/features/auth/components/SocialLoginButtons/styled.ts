import { Button } from '@mantine/core';
import styled from 'styled-components';
import { ink, focusRing } from '../../common/tokens';

export const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const SocialButton = styled(Button)`
  &:hover {
    border-color: ${ink} !important;
    background: #faf8ef !important;
  }

  &:focus-visible {
    ${focusRing}
  }
`;

export const SocialLabel = styled.span`
  @media (max-width: 420px) {
    display: none;
  }
`;
