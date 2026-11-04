'use client';

import { useState, type FormEvent } from 'react';
import { AuthForm, AuthLink, AuthShell, AuthTextField, SubmitButton } from '../components';
import { NoticeArea, useMockSubmit } from '../common/shared';
import { getEmailError } from '../common/validation';

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const { loading, notice, run } = useMockSubmit();
  const emailError = getEmailError(email);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (emailError || loading) return;
    void run('Giao diện đang ở chế độ demo: chưa có email khôi phục nào được gửi đi.');
  };

  return (
    <AuthShell
      eyebrow="Đừng lo"
      title="Quên mật khẩu?"
      description="Nhập email của bạn, chúng tôi sẽ hướng dẫn cách đặt lại mật khẩu."
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthForm onSubmit={handleSubmit} noValidate aria-busy={loading}>
        <AuthTextField
          label="Địa chỉ email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="ban@email.com"
          value={email}
          onChange={setEmail}
          onBlur={() => setTouched(true)}
          error={touched ? emailError : ''}
        />
        <SubmitButton
          loading={loading}
          disabled={Boolean(emailError)}
          idleLabel="Gửi hướng dẫn"
          loadingLabel="Đang xử lý..."
        />
        <NoticeArea message={notice} />
      </AuthForm>
    </AuthShell>
  );
}
