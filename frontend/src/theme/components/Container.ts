import { Container } from '@mantine/core';
import { theme } from '~/constants';

export const MantineContainer = Container.extend({
  defaultProps: {
    size: theme.breakpoints.LG,
  },
});
