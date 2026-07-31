import { Input } from '@mantine/core';

export const MantineInput = Input.extend({
  defaultProps: {
    size: 'md',
  },
});

export const MantineInputWrapper = Input.Wrapper.extend({
  defaultProps: {
    size: 'md',
  },
});
