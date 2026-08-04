import Link from 'next/link';
import styled from 'styled-components';

export const StyledAnchor = styled(Link)`
  display: inline-flex;
  align-items: center;

  padding: 6px 12px;

  color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.BORDER_DEFAULT};
  border-radius: 6px;

  text-decoration: none;

  transition:
    color 150ms ease,
    border-color 150ms ease,
    background-color 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.BORDER_DEFAULT};
    background-color: ${({ theme }) => theme.colors.BG_BUTTON_HOVER};
  }
`;
