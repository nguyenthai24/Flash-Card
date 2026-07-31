import { css } from 'styled-components';

export const TreeCheckboxOveride = css`
  .rct-node-icon {
    display: none;
  }

  .rct-text > label {
    display: flex;
  }

  .rct-icon {
    color: ${(props) => props.theme.colors.GRAY};

    &.rct-icon-half-check,
    &.rct-icon-uncheck,
    &.rct-icon-check {
      font-size: 2rem;
    }

    &.rct-icon-half-check,
    &.rct-icon-check {
      color: ${(props) => props.theme.colors.PRIMARY};
    }
  }
`;
