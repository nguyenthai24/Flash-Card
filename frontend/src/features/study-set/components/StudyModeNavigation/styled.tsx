import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

interface StyledButtonProps extends ButtonProps {
  $active?: boolean;
}

const StyledButtonBase = styled(Button)<{
  $active?: boolean;
}>`
  padding: 0 20px;
  height: 50px;

  background-color: ${({ theme }) => theme.colors.BG_BUTTON_1};
  border: 1px solid ${({ theme }) => theme.colors.BORDER_1};
  color: ${({ theme }) => theme.colors.TEXT_DEFAULT};

  display: flex;
  justify-content: flex-start;

  box-shadow: ${({ $active }) => ($active ? '0 2px 8px rgba(168, 85, 247, 0.35)' : 'none')};

  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out;

  &:hover {
    transform: translateY(-2px) translateZ(0);
    background-color: ${({ theme }) => theme.colors.BG_BUTTON_1};
  }
`;

export const StyledButton = createPolymorphicComponent<'button', StyledButtonProps>(
  StyledButtonBase
);
