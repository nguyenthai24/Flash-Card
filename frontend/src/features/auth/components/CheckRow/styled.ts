import { Checkbox } from '@mantine/core';
import styled from 'styled-components';
import { accentDark, focusRing } from '../../common/tokens';

export const StyledCheckbox = styled(Checkbox)`
  .mantine-Checkbox-input:checked {
    border-color: ${accentDark};
    background: ${accentDark};
  }

  .mantine-Checkbox-input:focus-visible {
    ${focusRing}
  }
`;
