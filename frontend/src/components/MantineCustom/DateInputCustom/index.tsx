'use client';

import { DateInput, DateInputProps } from '@mantine/dates';
import CalendarIcon from '~/assets/icons/CalendarIcon';
import { DATE_FORMAT } from '~/constants';

/**
 * @description Custom lại DatePickerInput để hiển thị rightSection khi không có dữ liệu
 */
export default function DateInputCustom({ clearable = true, disabled, ...props }: DateInputProps) {
  clearable = props.required ? false : clearable;

  const rightSection = disabled || !clearable || !props.value ? <CalendarIcon /> : null;

  return (
    <DateInput
      valueFormat={DATE_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={!!props.value ? 'auto' : 'none'}
      allowDeselect={false}
      disabled={disabled}
      {...props}
    />
  );
}
