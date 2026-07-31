import { css } from 'styled-components';

export const AnchorOveride = css`
  .vihub-Anchor-root {
    color: ${(props) => props.theme.colors.TEXT_PRIMARY};

    &:hover {
      color: ${(props) => props.theme.colors.PRIMARY} !important;
      text-decoration: unset;

      .vihub-Text-root {
        color: ${(props) => props.theme.colors.PRIMARY} !important;
      }

      path {
        fill: ${(props) => props.theme.colors.PRIMARY} !important;
      }
    }
  }
`;
