'use client';

import { Alert } from '@mantine/core';
import type { ReactNode } from 'react';
import { ink } from '../../common/tokens';

type Tone = 'info' | 'success' | 'error';

const NOTICE_STYLE: Record<Tone, { bg: string; border: string }> = {
  info: { bg: '#f8f2d8', border: '#c8c0ab' },
  success: { bg: '#e2ecdc', border: '#5f7d53' },
  error: { bg: '#fbece9', border: '#b94b3c' },
};

interface AuthNoticeProps {
  tone: Tone;
  role?: 'alert' | 'status';
  children: ReactNode;
}

export function AuthNotice({ tone, role, children }: AuthNoticeProps) {
  const { bg, border } = NOTICE_STYLE[tone];
  return (
    <Alert
      role={role ?? 'status'}
      radius={10}
      p="12px 14px"
      styles={{
        root: { background: bg, border: `1.5px solid ${border}`, color: ink },
        message: { fontSize: 14, lineHeight: 1.5, color: ink },
      }}
    >
      {children}
    </Alert>
  );
}
