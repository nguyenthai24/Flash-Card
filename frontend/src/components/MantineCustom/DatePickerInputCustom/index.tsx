"use client";

import {
  DatePickerInput,
  DatePickerInputProps,
  DatePickerType,
} from "@mantine/dates";
import { CiCalendar } from "react-icons/ci";
import { DATE_FORMAT } from "~/constants";

export type IDatePickerInputCustomProps<
  Type extends DatePickerType = "default",
> = DatePickerInputProps<Type>;

/**
 * @description Custom lại DatePickerInput để hiển thị rightSection khi không có dữ liệu
 */
export default function DatePickerInputCustom<
  Type extends DatePickerType = "default",
>({ clearable = true, disabled, ...props }: IDatePickerInputCustomProps<Type>) {
  clearable = props.required ? false : clearable;

  const hasValue = (() => {
    if (!props.type || props.type === "default") return !!props.value;
    if (props.type === "range" && Array.isArray(props?.value))
      return props?.value?.some((e) => !!e);

    return;
  })();

  const rightSection =
    disabled || !clearable || !hasValue ? <CiCalendar /> : null;

  return (
    <DatePickerInput
      valueFormat={DATE_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={hasValue ? "auto" : "none"}
      allowSingleDateInRange={(props.type === "range") as any}
      disabled={disabled}
      {...props}
    />
  );
}
