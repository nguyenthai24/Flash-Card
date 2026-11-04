'use client';

import { useState, type FormEvent } from 'react';
import {
  AuthForm,
  AuthLink,
  AuthPasswordField,
  AuthRow,
  AuthShell,
  AuthTextField,
  CheckRow,
  SubmitButton,
} from '../components';
import { NoticeArea, SocialSection, useMockSubmit, type Touched } from '../common/shared';
import { getEmailError, getPasswordError } from '../common/validation';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState<Touched<'email' | 'password'>>({
    email: false,
    password: false,
  });
  const { loading, notice, run } = useMockSubmit();

  const emailError = getEmailError(email);
  const passwordError = getPasswordError(password);
  const invalid = Boolean(emailError || passwordError);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (invalid || loading) return;
    void run('Giao diện đang ở chế độ demo: chưa kết nối xác thực nên không có phiên đăng nhập nào được tạo.');
  };

  return (
    <AuthShell
      eyebrow="Chào mừng trở lại"
      title="Đăng nhập"
      description="Tiếp tục hành trình học tiếng Anh của bạn nhé."
      footer={
        <>
          Chưa có tài khoản? <AuthLink href="/register">Đăng ký</AuthLink>
        </>
      }
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
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={touched.email ? emailError : ''}
        />
        <AuthPasswordField
          label="Mật khẩu"
          name="password"
          autoComplete="current-password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          error={touched.password ? passwordError : ''}
        />
        <AuthRow>
          <CheckRow checked={remember} onChange={setRemember}>
            Ghi nhớ tôi
          </CheckRow>
          <AuthLink href="/forgot-password">Quên mật khẩu?</AuthLink>
        </AuthRow>
        <SubmitButton
          loading={loading}
          disabled={invalid}
          idleLabel="Đăng nhập"
          loadingLabel="Đang xử lý..."
        />
        <NoticeArea message={notice} />
      </AuthForm>
      <div style={{ marginTop: 20 }}>
        <SocialSection />
      </div>
    </AuthShell>
  );
}
