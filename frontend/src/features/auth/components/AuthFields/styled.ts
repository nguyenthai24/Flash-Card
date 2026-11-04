import { PasswordInput, TextInput } from '@mantine/core';
import styled, { css } from 'styled-components';
import { accentDark, danger, focusRing, ink, muted } from '../../common/tokens';

const fieldStyles = css`
  .mantine-Input-input {
    height: 48px;
    min-height: 48px;
    border: 1.5px solid #cfc8b5;
    border-radius: 10px;
    background: #fff;
    color: ${ink};
    font-family: inherit;
    font-size: 16px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .mantine-Input-input::placeholder {
    color: #9b968a;
  }

  .mantine-Input-input:hover {
    border-color: #a9a28d;
  }

  .mantine-Input-input:focus,
  .mantine-Input-input:focus-within {
    border-color: ${ink};
    box-shadow: 0 0 0 4px rgba(159, 189, 145, 0.55);
  }

  .mantine-Input-input[data-error] {
    border-color: ${danger};
  }

  .mantine-Input-input[data-error]:focus,
  .mantine-Input-input[data-error]:focus-within {
    box-shadow: 0 0 0 4px rgba(185, 75, 60, 0.2);
  }

  .mantine-InputWrapper-label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
  }

  .mantine-InputWrapper-error,
  .mantine-InputWrapper-description {
    margin-top: 6px;
    font-size: 13px;
  }

  .mantine-InputWrapper-error {
    color: ${danger};
    font-weight: 600;
  }

  .mantine-InputWrapper-description {
    color: ${muted};
  }
`;

export const StyledTextInput = styled(TextInput)`
  ${fieldStyles}
`;

export const StyledPasswordInput = styled(PasswordInput)`
  ${fieldStyles}

  .mantine-PasswordInput-innerInput {
    height: 45px;
    border: 0;
    box-shadow: none;
    background: transparent;
  }

  .mantine-PasswordInput-visibilityToggle {
    width: auto;
    min-width: 56px;
    height: 36px;
    margin: 4px;
    padding: 0 10px;
    border-radius: 8px;
    color: ${accentDark};
    font-size: 14px;
    font-weight: 700;
  }

  .mantine-PasswordInput-visibilityToggle:hover {
    background: #e2ecdc;
  }

  .mantine-PasswordInput-visibilityToggle:focus-visible {
    ${focusRing}
  }
`;
