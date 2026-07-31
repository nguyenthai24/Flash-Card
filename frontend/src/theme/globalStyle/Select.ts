import { css } from 'styled-components';

export const SelectOveride = css`
  .vihub-MultiSelect-input {
    display: flex;
  }

  .vihub-Select-dropdown,
  .vihub-MultiSelect-dropdown {
    .vihub-ScrollArea-viewport {
      padding-right: 0;
    }
  }

  .vihub-MultiSelect-input[data-expanded='true'],
  .vihub-Select-input[data-expanded='true'] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .vihub-MultiSelect-input[data-disabled='true'],
  .vihub-Select-input[data-disabled='true'] {
    pointer-events: none;
  }

  .vihub-Select-dropdown,
  .vihub-MultiSelect-dropdown {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translateY(-8px);
    border: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
    border-top: none;
    padding: 0;
    overflow: hidden;
  }

  .vihub-MultiSelect-option,
  .vihub-Select-option {
    border-radius: 0;

    &:hover {
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};
    }
  }
`;
