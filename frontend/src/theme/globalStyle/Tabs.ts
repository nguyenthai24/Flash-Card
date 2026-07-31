import { css } from 'styled-components';

export const TabsOveride = css`
  .vihub-Tabs-list::before {
    border-color: ${(props) => props.theme.colors.BORDER_PRIMARY};
  }

  .vihub-Tabs-tab {
    .vihub-Tabs-tabLabel {
      font-weight: 500;
      font-size: 1.6rem;
    }

    &:hover {
      background-color: transparent;

      .vihub-Tabs-tabLabel {
        color: ${(props) => props.theme.colors.PRIMARY};
      }
    }

    &[data-active='true'] {
      border-color: ${(props) => props.theme.colors.PRIMARY};

      .vihub-Tabs-tabLabel {
        color: ${(props) => props.theme.colors.PRIMARY};
      }
    }
  }
`;
