'use client';

import type { TextInput } from '@mantine/core';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { StyledPasswordInput, StyledTextInput } from './styled';

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: ComponentPropsWithoutRef<typeof TextInput>['inputMode'];
  onBlur?: () => void;
}

// role="alert" để trình đọc màn hình đọc lỗi ngay khi xuất hiện
const renderError = (error?: string): ReactNode =>
  error ? (
    <span role="alert">
      <span aria-hidden="true">⚠ </span>
      {error}
    </span>
  ) : undefined;

export function AuthTextField({ label, value, error, onChange, ...rest }: FieldProps) {
  return (
    <StyledTextInput
      {...rest}
      label={label}
      value={value}
      error={renderError(error)}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}

export function AuthPasswordField({ label, value, error, onChange, ...rest }: FieldProps) {
  return (
    <StyledPasswordInput
      {...rest}
      label={label}
      value={value}
      error={renderError(error)}
      onChange={(event) => onChange(event.currentTarget.value)}
      visibilityToggleButtonProps={{ 'aria-label': 'Hiện hoặc ẩn mật khẩu', tabIndex: 0 }}
      visibilityToggleIcon={({ reveal }) => <span>{reveal ? 'Ẩn' : 'Hiện'}</span>}
    />
  );
}
