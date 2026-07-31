import { css } from 'styled-components';

export const MantineReactTableOveride = css`
  table.mrt-table.vihub-Table-table {
    --header-mrt_row_expand-size: 0px !important;
    --col-mrt_row_expand-size: 0px !important;
    --header-mrt_row_select-size: 0px !important;
    --col-mrt_row_select-size: 0px !important;
  }

  .vihub-Table-table .vihub-Table-tr:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
  }

  .vihub-Table-tr:hover {
    box-shadow: ${(props) => props.theme.shadows.SHADOW};

    .row-actions {
      display: flex;
    }

    .vihub-Table-td {
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY} !important;
    }
  }

  .vihub-Table-td,
  .vihub-Table-th {
    font-size: 1.6rem;
  }

  .mrt-bottom-toolbar {
    height: 6.4rem;
  }

  .mrt-table-paper {
    border-radius: 0;
    border-right: none;
    border-left: none;
    border-bottom: none;
  }

  .mrt-expand-button {
    --mrt-row-depth: 0 !important;
  }
`;
