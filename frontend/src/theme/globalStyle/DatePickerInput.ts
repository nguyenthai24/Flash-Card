import { css } from 'styled-components';

export const DatePickerInputOveride = css`
  .vihub-DatePickerInput-input[disabled] {
    color: ${(props) => props.theme.colors.TEXT_PRIMARY};
    opacity: 1;
  }

  .vihub-InputPlaceholder-placeholder {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
