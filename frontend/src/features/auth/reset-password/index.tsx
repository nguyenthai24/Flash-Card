'use client';

import { useState, type FormEvent } from 'react';
import {
  AuthForm,
  AuthLink,
  AuthNotice,
  AuthPasswordField,
  AuthShell,
  AuthStack,
  PasswordRequirements,
  SubmitButton,
} from '../components';
import { NoticeArea, useMockSubmit, type Touched } from '../common/shared';
import { getConfirmPasswordError, getNewPasswordError } from '../common/validation';

export function ResetPasswordScreen({ hasToken }: { hasToken: boolean }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touched, setTouched] = useState<Touched<'password' | 'confirm'>>({
    password: false,
    confirm: false,
  });
  const { loading, notice, run } = useMockSubmit();

  const passwordError = getNewPasswordError(password);
  const confirmError = getConfirmPasswordError(password, confirm);
  const invalid = Boolean(passwordError || confirmError);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ password: true, confirm: true });
    if (invalid || loading) return;
    void run('Giao diện đang ở chế độ demo: mật khẩu chưa được thay đổi và token chưa được xác thực.');
  };

  return (
    <AuthShell
      eyebrow="Gần xong rồi"
      title="Đặt mật khẩu mới"
      description="Chọn một mật khẩu mạnh mà bạn dễ nhớ."
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      {!hasToken ? (
        <AuthStack>
          <AuthNotice tone="error" role="alert">
            Liên kết đặt lại mật khẩu thiếu mã token. Vui lòng yêu cầu liên kết mới.
          </AuthNotice>
          <AuthLink href="/forgot-password">Yêu cầu liên kết mới</AuthLink>
        </AuthStack>
      ) : (
        <AuthForm onSubmit={handleSubmit} noValidate aria-busy={loading}>
          <AuthPasswordField
            label="Mật khẩu mới"
            name="new-password"
            autoComplete="new-password"
            placeholder="Nhập mật khẩu mới"
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
          <SubmitButton
            loading={loading}
            disabled={invalid}
            idleLabel="Đặt mật khẩu"
            loadingLabel="Đang xử lý..."
          />
          <NoticeArea message={notice} />
        </AuthForm>
      )}
    </AuthShell>
  );
}
