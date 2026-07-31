'use client';

import { DateTimePicker, DateTimePickerProps } from '@mantine/dates';
import CalendarIcon from '~/assets/icons/CalendarIcon';
import { DATE_TIME_FORMAT } from '~/constants';

export interface IDateTimePickerCustomProps extends DateTimePickerProps {}

/**
 * @description Custom lại DateTimePicker để hiển thị rightSection khi không có dữ liệu
 */
export default function DateTimePickerCustom({
  clearable = true,
  disabled,
  ...props
}: IDateTimePickerCustomProps) {
  clearable = props.required ? false : clearable;

  const rightSection = disabled || !clearable || !props.value ? <CalendarIcon /> : null;

  return (
    <DateTimePicker
      valueFormat={DATE_TIME_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={props.value ? 'auto' : 'none'}
      disabled={disabled}
      {...props}
    />
  );
}
