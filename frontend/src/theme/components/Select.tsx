import { Select } from '@mantine/core';

export const MantineSelect = Select.extend({
  defaultProps: {
    clearable: true,
    searchable: true,
    allowDeselect: false,
    nothingFoundMessage: 'Không có dữ liệu',
    size: 'md',
  },
});
