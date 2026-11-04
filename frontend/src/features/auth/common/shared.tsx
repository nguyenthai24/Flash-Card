'use client';

import { useState } from 'react';
import { AuthDivider, AuthNotice, AuthStack, SocialLoginButtons } from '../components';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export type Touched<K extends string> = Record<K, boolean>;

// Mô phỏng thời gian xử lý ở local, không gọi backend.
export function useMockSubmit() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const run = async (message: string) => {
    setNotice('');
    setLoading(true);
    await wait(700);
    setLoading(false);
    setNotice(message);
  };
  return { loading, notice, run, setNotice };
}

export function SocialSection() {
  const [message, setMessage] = useState('');
  return (
    <AuthStack>
      <AuthDivider>hoặc tiếp tục với</AuthDivider>
      <SocialLoginButtons
        onSelect={(provider) =>
          setMessage(`Đăng nhập bằng ${provider} chưa được cấu hình. Không có yêu cầu nào được gửi đi.`)
        }
      />
      <div aria-live="polite">{message && <AuthNotice tone="info">{message}</AuthNotice>}</div>
    </AuthStack>
  );
}

export function NoticeArea({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite">
      {message && <AuthNotice tone="info">{message}</AuthNotice>}
    </div>
  );
}
