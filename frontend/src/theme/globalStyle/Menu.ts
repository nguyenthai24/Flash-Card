import { css } from 'styled-components';

export const MenuOveride = css`
  .vihub-Menu-item:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};

    .vihub-Text-root {
      color: ${(props) => props.theme.colors.PRIMARY} !important;
    }
  }
`;
