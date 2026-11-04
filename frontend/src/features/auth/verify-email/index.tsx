'use client';

import { useState } from 'react';
import { AuthForm, AuthLink, AuthNotice, AuthShell, AuthStack, SubmitButton } from '../components';
import { NoticeArea, useMockSubmit } from '../common/shared';

export function VerifyEmailScreen() {
  const [seconds, setSeconds] = useState(0);
  const { loading, notice, run } = useMockSubmit();

  const handleResend = async () => {
    if (loading || seconds > 0) return;
    await run('Giao diện đang ở chế độ demo: chưa có email nào được gửi đi.');
    setSeconds(30);
    const timer = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  return (
    <AuthShell
      eyebrow="Kiểm tra hộp thư"
      title="Xác minh email"
      description="Chúng tôi sẽ gửi một liên kết xác minh đến email bạn đã đăng ký. Hãy mở liên kết đó để kích hoạt tài khoản."
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthStack>
        <AuthForm
          onSubmit={(event) => {
            event.preventDefault();
            void handleResend();
          }}
        >
          <SubmitButton
            loading={loading}
            disabled={seconds > 0}
            idleLabel={seconds > 0 ? `Gửi lại sau ${seconds}s` : 'Gửi lại email xác minh'}
            loadingLabel="Đang xử lý..."
          />
        </AuthForm>
        <NoticeArea message={notice} />
      </AuthStack>
    </AuthShell>
  );
}

const RESULTS: Record<string, { tone: 'success' | 'error' | 'info'; title: string; text: string }> = {
  success: {
    tone: 'success',
    title: 'Xác minh thành công',
    text: 'Email của bạn đã được xác minh. Bạn có thể đăng nhập.',
  },
  expired: {
    tone: 'error',
    title: 'Liên kết đã hết hạn',
    text: 'Liên kết xác minh không còn hiệu lực. Hãy yêu cầu gửi lại email xác minh.',
  },
  invalid: {
    tone: 'error',
    title: 'Liên kết không hợp lệ',
    text: 'Chúng tôi không thể xác minh liên kết này. Hãy kiểm tra lại hoặc yêu cầu liên kết mới.',
  },
};

export function VerifyEmailResultScreen({ result }: { result?: string }) {
  const data = (result && RESULTS[result]) || {
    tone: 'info' as const,
    title: 'Chưa có kết quả',
    text: 'Chưa có kết quả xác minh để hiển thị. Đây chỉ là trang giao diện, chưa kiểm tra token thật.',
  };
  return (
    <AuthShell
      eyebrow="Kết quả xác minh"
      title={data.title}
      description={data.text}
      footer={<AuthLink href="/login">Đến trang đăng nhập</AuthLink>}
    >
      <AuthNotice tone={data.tone} role={data.tone === 'error' ? 'alert' : 'status'}>
        {data.tone === 'success' ? '✓ ' : data.tone === 'error' ? '⚠ ' : ''}
        {data.title}
      </AuthNotice>
    </AuthShell>
  );
}
