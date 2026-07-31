'use client';

import { Select, SelectProps } from '@mantine/core';
import SelectDownIcon from '~/assets/icons/SelectIcon';

/**
 * @description Custom lại Select để hiển thị rightSection khi không có dữ liệu
 */
export default function SelectCustom({ clearable = true, disabled, ...props }: SelectProps) {
  // nếu select bắt buộc phải chọn 1 option thì không cho phép clearable
  clearable = props.required ? false : clearable;

  const rightSection = disabled || !clearable || !props.value ? <SelectDownIcon /> : null;

  return (
    <Select
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={!!props.value ? 'auto' : 'none'}
      disabled={disabled}
      {...props}
    />
  );
}
