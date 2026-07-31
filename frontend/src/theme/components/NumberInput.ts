import { NumberInput } from '@mantine/core';

export const MantineNumberInput = NumberInput.extend({
  defaultProps: {
    allowDecimal: false,
    allowNegative: false,
    hideControls: true,
    size: 'md',
  },
});
