import { css } from 'styled-components';

export const InputOveride = css`
  div.vihub-Input-input,
  input.vihub-Input-input,
  button.vihub-Input-input {
    // min-height: 4.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vihub-InputWrapper-label {
    // font-size: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
    padding-left: 1.2rem;
  }

  .vihub-InputPlaceholder-placeholder {
    font-weight: 300;
  }

  input:placeholder-shown {
    text-overflow: ellipsis;
    font-weight: 300;
  }

  .vihub-InputWrapper-root {
    position: relative;
  }

  .vihub-Input-wrapper[data-error='true'] {
  }

  // .vihub-InputWrapper-error {
  //   position: absolute;
  // }

  .vihub-Input-input[disabled],
  .vihub-Input-input[data-disabled='true'] {
    background-color: ${(props) => props.theme.colors.INPUT_DISABLED_BG} !important;
    color: ${(props) => props.theme.colors.TEXT_PRIMARY} !important;
    opacity: 1 !important;
  }

  .vihub-Checkbox-input:checked:not(:disabled) {
    background-color: ${(props) => props.theme.colors.PRIMARY + '10'};
  }

  .vihub-PillGroup-group {
    width: 100%;
  }
`;
