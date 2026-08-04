import { Text } from '@mantine/core';
import { theme } from '~/constants';

export const MantineContainer = Text.extend({
  defaultProps: {
    styles: {
      root: {
        fontSize: '1.6rem',
        color: theme.colors.TEXT_DEFAULT,
      },
    },
  },
});
