'use client';

import { useEffect, useState } from 'react';
import { AuthForm, AuthLink, AuthNotice, AuthShell, AuthStack, AuthTextField, SubmitButton } from '../components';
import { NoticeArea } from '../common/shared';
import { useAuthAction } from '../common/useAuthAction';
import { authService } from '../services/auth.service';

export function VerifyEmailScreen() {
  const [email, setEmail] = useState('');
  const [seconds, setSeconds] = useState(0);
  const { loading, notice, noticeTone, run } = useAuthAction();

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const handleResend = () => {
    if (loading || seconds > 0 || !email.trim()) return;
    run(
      () => authService.resendVerification(email),
      {
        successMessage: 'Nếu tài khoản cần xác minh, email hướng dẫn sẽ được gửi.',
        onSuccess: () => setSeconds(45),
      },
    );
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
          <AuthTextField
            label="Địa chỉ email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="ban@email.com"
            value={email}
            onChange={setEmail}
          />
          <SubmitButton
            loading={loading}
            disabled={seconds > 0 || !email.trim()}
            idleLabel={seconds > 0 ? `Gửi lại sau ${seconds}s` : 'Gửi lại email xác minh'}
            loadingLabel="Đang xử lý..."
          />
        </AuthForm>
        <NoticeArea message={notice} tone={noticeTone} />
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

export function VerifyEmailResultScreen({ token }: { token?: string }) {
  const [result, setResult] = useState(token ? 'loading' : 'invalid');
  const { notice, noticeTone, run } = useAuthAction();

  useEffect(() => {
    if (!token) return;
    run(
      () => authService.verifyEmail(token),
      {
        onSuccess: () => setResult('success'),
        onError: () => setResult('invalid'),
      },
    );
  }, [run, token]);

  const data = (result && RESULTS[result]) || (result === 'loading' ? {
    tone: 'info' as const,
    title: 'Đang xác minh email',
    text: 'Đang kiểm tra liên kết xác minh của bạn.',
  } : {
    tone: 'info' as const,
    title: 'Chưa có kết quả',
    text: notice || 'Chưa có kết quả xác minh để hiển thị.',
  });
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
      {notice && <NoticeArea message={notice} tone={noticeTone} />}
      {result === 'expired' || result === 'invalid' ? (
        <AuthLink href="/verify-email">Gửi lại email xác minh</AuthLink>
      ) : null}
    </AuthShell>
  );
}
