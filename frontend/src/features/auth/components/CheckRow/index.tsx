'use client';

import type { ReactNode } from 'react';
import { ink } from '../../common/tokens';
import { StyledCheckbox } from './styled';

interface CheckRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

export function CheckRow({ checked, onChange, children }: CheckRowProps) {
  return (
    <StyledCheckbox
      checked={checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
      label={children}
      variant="filled"
      color="#5f7d53"
      styles={{
        label: { fontSize: 14, lineHeight: 1.5, color: ink },
        input: { width: 20, height: 20, borderRadius: 5, borderColor: '#a9a28d' },
        icon: { width: 12 },
      }}
    />
  );
}
