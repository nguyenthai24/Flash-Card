'use client';

import { MultiSelect, MultiSelectProps } from '@mantine/core';
import SelectDownIcon from '~/assets/icons/SelectIcon';

/**
 * @description Custom lại MultiSelect để hiển thị rightSection khi không có dữ liệu
 */
export default function MultiSelectCustom({
  clearable = true,
  placeholder,
  disabled,
  ...props
}: MultiSelectProps) {
  clearable = props.required ? false : clearable;

  const hasValue = !(!props.value || props.value.length === 0);
  const rightSection = disabled || !clearable || !hasValue ? <SelectDownIcon /> : undefined;

  return (
    <MultiSelect
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={hasValue ? 'auto' : 'none'}
      placeholder={hasValue ? '' : placeholder} //ẩn placeholder khi có value
      disabled={disabled}
      {...props}
    />
  );
}
