'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  AuthForm,
  AuthLink,
  AuthNotice,
  AuthShell,
  AuthStack,
  AuthTextField,
  SubmitButton,
} from '../components';
import { NoticeArea } from '../common/shared';
import { useAuthAction } from '../common/useAuthAction';
import { authService } from '../services/auth.service';

export function VerifyEmailScreen() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(() => searchParams.get('email') ?? '');
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [verified, setVerified] = useState(false);
  const { loading, notice, noticeTone, run } = useAuthAction();

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const handleVerify = (event: FormEvent) => {
    event.preventDefault();
    if (loading || !email.trim() || !/^\d{6}$/.test(code)) return;
    run(
      () => authService.verifyEmail(email.trim(), code),
      {
        successMessage: 'Email đã được xác minh. Bạn có thể đăng nhập.',
        onSuccess: () => setVerified(true),
      },
    );
  };

  const handleResend = (event: FormEvent) => {
    event.preventDefault();
    if (loading || seconds > 0 || !email.trim()) return;
    run(
      () => authService.resendVerification(email.trim()),
      {
        successMessage: 'Nếu tài khoản cần xác minh, mã OTP sẽ được gửi đến email.',
        onSuccess: () => setSeconds(45),
      },
    );
  };

  return (
    <AuthShell
      eyebrow="Kiểm tra hộp thư"
      title={verified ? 'Email đã xác minh' : 'Nhập mã OTP'}
      description={
        verified
          ? 'Tài khoản của bạn đã sẵn sàng. Hãy đăng nhập để bắt đầu học.'
          : 'Nhập mã gồm 6 chữ số đã được gửi đến email đăng ký. Mã có hiệu lực trong 10 phút.'
      }
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthStack>
        {verified ? (
          <AuthNotice tone="success" role="status">
            Email đã được xác minh thành công.
          </AuthNotice>
        ) : (
          <>
            <AuthForm onSubmit={handleVerify} noValidate aria-busy={loading}>
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
              <AuthTextField
                label="Mã OTP"
                type="text"
                name="one-time-code"
                autoComplete="one-time-code"
                inputMode="numeric"
                placeholder="Nhập mã 6 chữ số"
                value={code}
                onChange={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
              />
              <SubmitButton
                loading={loading}
                disabled={!email.trim() || !/^\d{6}$/.test(code)}
                idleLabel="Xác minh email"
                loadingLabel="Đang xác minh..."
              />
            </AuthForm>
            <AuthForm onSubmit={handleResend}>
              <SubmitButton
                loading={loading}
                disabled={seconds > 0 || !email.trim()}
                idleLabel={seconds > 0 ? `Gửi lại sau ${seconds}s` : 'Gửi lại mã OTP'}
                loadingLabel="Đang gửi..."
              />
            </AuthForm>
          </>
        )}
        <NoticeArea message={notice} tone={noticeTone} />
      </AuthStack>
    </AuthShell>
  );
}
