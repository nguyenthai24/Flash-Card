'use client';

import { useState, type FormEvent } from 'react';
import {
  AuthForm,
  AuthLink,
  AuthPasswordField,
  AuthShell,
  AuthTextField,
  CheckRow,
  PasswordRequirements,
  SubmitButton,
} from '../components';
import { NoticeArea, SocialSection, useMockSubmit, type Touched } from '../common/shared';
import { getConfirmPasswordError, getEmailError, getNewPasswordError } from '../common/validation';

export function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState<Touched<'email' | 'password' | 'confirm'>>({
    email: false,
    password: false,
    confirm: false,
  });
  const { loading, notice, run } = useMockSubmit();

  const emailError = getEmailError(email);
  const passwordError = getNewPasswordError(password);
  const confirmError = getConfirmPasswordError(password, confirm);
  const invalid = Boolean(emailError || passwordError || confirmError || !agreed);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ email: true, password: true, confirm: true });
    if (invalid || loading) return;
    void run('Giao diện đang ở chế độ demo: chưa kết nối backend nên không có tài khoản hay email xác minh nào được tạo.');
  };

  return (
    <AuthShell
      eyebrow="Bắt đầu thôi"
      title="Tạo tài khoản"
      description="Chỉ mất một phút để bắt đầu học từ vựng mỗi ngày."
      footer={
        <>
          Đã có tài khoản? <AuthLink href="/login">Đăng nhập</AuthLink>
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
          name="new-password"
          autoComplete="new-password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          error={touched.password ? passwordError : ''}
        />
        <PasswordRequirements password={password} />
        <AuthPasswordField
          label="Nhập lại mật khẩu"
          name="confirm-password"
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu"
          value={confirm}
          onChange={setConfirm}
          onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
          error={touched.confirm ? confirmError : ''}
        />
        <CheckRow checked={agreed} onChange={setAgreed}>
          Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật.
        </CheckRow>
        <SubmitButton
          loading={loading}
          disabled={invalid}
          idleLabel="Tạo tài khoản"
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
