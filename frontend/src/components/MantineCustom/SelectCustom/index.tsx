'use client';

import { Select, SelectProps } from '@mantine/core';
import { FaAngleDown } from 'react-icons/fa';
import { theme } from '~/constants';
import classes from './Select.module.css';

/**
 * @description Custom lại Select để hiển thị rightSection khi không có dữ liệu
 */
export default function SelectCustom({ clearable = true, disabled, ...props }: SelectProps) {
  // nếu select bắt buộc phải chọn 1 option thì không cho phép clearable
  clearable = props.required ? false : clearable;

  const rightSection = disabled || !clearable || !props.value ? <FaAngleDown /> : null;

  return (
    <Select
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={!!props.value ? 'auto' : 'none'}
      disabled={disabled}
      // classNames={{
      //   option: classes.option,
      // }}

      {...props}
    />
  );
}
