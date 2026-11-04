'use client';

import { Loader } from '@mantine/core';
import type { CSSProperties } from 'react';
import { ink } from '../../common/tokens';
import { PrimaryButton } from './styled';

const PRIMARY_ROOT: CSSProperties = {
  height: 50,
  width: '100%',
  border: `1.5px solid ${ink}`,
  borderRadius: 12,
  background: '#9fbd91',
  boxShadow: `3px 4px 0 ${ink}`,
  color: ink,
  fontSize: 16,
  fontWeight: 700,
  transition: 'transform 0.15s, box-shadow 0.15s, background 0.15s',
};

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  idleLabel: string;
  loadingLabel: string;
}

export function SubmitButton({ loading, disabled, idleLabel, loadingLabel }: SubmitButtonProps) {
  return (
    <PrimaryButton
      type="submit"
      disabled={loading || disabled}
      aria-busy={loading}
      leftSection={loading ? <Loader size={18} color={ink} aria-hidden="true" /> : undefined}
      styles={{ root: PRIMARY_ROOT, label: { fontSize: 16, fontWeight: 700 } }}
    >
      {loading ? loadingLabel : idleLabel}
    </PrimaryButton>
  );
}
