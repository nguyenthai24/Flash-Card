import Link from 'next/link';
import styled from 'styled-components';
import { accentDark, focusRing, ink } from '../../common/tokens';

export const TextLink = styled(Link)`
  color: ${accentDark};
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${ink};
  }

  &:focus-visible {
    ${focusRing}
    border-radius: 4px;
  }
`;
