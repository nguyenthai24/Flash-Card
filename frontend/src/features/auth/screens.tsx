'use client';

import { useState, type FormEvent } from 'react';
import {
  AuthDivider,
  AuthForm,
  AuthLink,
  AuthNotice,
  AuthPasswordField,
  AuthRow,
  AuthShell,
  AuthStack,
  AuthTextField,
  CheckRow,
  PasswordRequirements,
  SocialLoginButtons,
  SubmitButton,
} from './components';
import {
  getConfirmPasswordError,
  getEmailError,
  getNewPasswordError,
  getPasswordError,
} from './validation';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Touched<K extends string> = Record<K, boolean>;

// Mô phỏng thời gian xử lý ở local, không gọi backend.
function useMockSubmit() {
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

function SocialSection() {
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

function NoticeArea({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite">
      {message && <AuthNotice tone="info">{message}</AuthNotice>}
    </div>
  );
}

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
        <SubmitButtonLike
          onClick={handleResend}
          loading={loading}
          disabled={seconds > 0}
          label={seconds > 0 ? `Gửi lại sau ${seconds}s` : 'Gửi lại email xác minh'}
        />
        <NoticeArea message={notice} />
      </AuthStack>
    </AuthShell>
  );
}

function SubmitButtonLike({
  onClick,
  loading,
  disabled,
  label,
}: {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  label: string;
}) {
  return (
    <AuthForm
      onSubmit={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <SubmitButton
        loading={loading}
        disabled={disabled}
        idleLabel={label}
        loadingLabel="Đang xử lý..."
      />
    </AuthForm>
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

export function OAuthCallbackScreen() {
  return (
    <AuthShell
      eyebrow="Đăng nhập mạng xã hội"
      title="Đang chờ tích hợp"
      description="Đây là trang nhận kết quả đăng nhập từ nhà cung cấp. Hiện chưa xử lý mã xác thực."
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthNotice tone="info" role="status">
        Chưa có phiên đăng nhập nào được tạo và không có dữ liệu nào được gửi đến backend.
      </AuthNotice>
    </AuthShell>
  );
}
