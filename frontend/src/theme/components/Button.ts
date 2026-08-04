import { Button } from '@mantine/core';

export const MantineButton = Button.extend({
  defaultProps: {
    size: 'md',
  },
  styles: () => ({
    root: {
      fontWeight: 400,
      borderRadius: '10px',
    },
  }),
});
