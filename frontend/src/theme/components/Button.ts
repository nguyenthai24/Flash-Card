import { Button } from '@mantine/core';

export const MantineButton = Button.extend({
  defaultProps: {
    size: 'md',
  },
  styles: (_, props) => ({
    root: {
      fontWeight: 400,
    },
  }),
});
