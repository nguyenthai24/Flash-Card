import { Button } from '@mantine/core';
import { theme } from '~/constants';

export const MantineButton = Button.extend({
  defaultProps: {
    size: 'md',
  },
  styles: () => ({
    root: {
      fontWeight: 400,
      borderRadius: '10px',
      backgroundColor: theme.colors.BG_BUTTON_1,
      border: `1px solid ${theme.colors.BORDER_1}`,
      color: theme.colors.TEXT_DEFAULT,
    },
  }),
});
