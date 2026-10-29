'use client';

import { Alert, Button, Checkbox, Loader, PasswordInput, TextInput } from '@mantine/core';
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { PASSWORD_MIN_LENGTH } from './validation';
import { authBodyFont, authHeadingFont } from './fonts';
import * as S from './components.styled';

export const AuthLink = S.TextLink;
export const AuthDivider = S.Divider;
export const AuthStack = S.Stack;
export const AuthRow = S.Row;
export const AuthForm = S.Form;

const INK = '#24231f';

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
        root: { background: bg, border: `1.5px solid ${border}`, color: INK },
        message: { fontSize: 14, lineHeight: 1.5, color: INK },
      }}
    >
      {children}
    </Alert>
  );
}

interface AuthShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, footer, children }: AuthShellProps) {
  return (
    <S.Page className={`${authHeadingFont.variable} ${authBodyFont.variable}`}>
      <S.Brand href="/login" aria-label="FlashCard - về trang đăng nhập">
        <S.BrandMark aria-hidden="true">✦</S.BrandMark>
        FlashCard
      </S.Brand>
      <S.Sheet>
        <S.Aside aria-hidden="true">
          <S.Kicker>✦ Học từ vựng mỗi ngày</S.Kicker>
          <S.AsideTitle>
            Tiếng Anh <span>dễ nhớ</span>, vui hơn.
          </S.AsideTitle>
          <S.WordCard>
            <strong>curiosity</strong>
            <small>/ˌkjʊəriˈɒsəti/ · sự tò mò</small>
            <span>Curiosity helps you learn faster.</span>
          </S.WordCard>
          <S.AsideNote>Học theo nhịp độ của riêng bạn.</S.AsideNote>
        </S.Aside>
        <S.Panel>
          <S.PanelInner>
            {eyebrow && <S.Eyebrow>{eyebrow}</S.Eyebrow>}
            <S.Title>{title}</S.Title>
            <S.Intro>{description}</S.Intro>
            {children}
            {footer && <S.Footer>{footer}</S.Footer>}
          </S.PanelInner>
        </S.Panel>
      </S.Sheet>
    </S.Page>
  );
}

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: ComponentPropsWithoutRef<typeof TextInput>['inputMode'];
  onBlur?: () => void;
}

// role="alert" để trình đọc màn hình đọc lỗi ngay khi xuất hiện
const renderError = (error?: string): ReactNode =>
  error ? (
    <span role="alert">
      <span aria-hidden="true">⚠ </span>
      {error}
    </span>
  ) : undefined;

export function AuthTextField({ label, value, error, onChange, ...rest }: FieldProps) {
  return (
    <TextInput
      {...rest}
      label={label}
      value={value}
      error={renderError(error)}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}

export function AuthPasswordField({ label, value, error, onChange, ...rest }: FieldProps) {
  return (
    <PasswordInput
      {...rest}
      label={label}
      value={value}
      error={renderError(error)}
      onChange={(event) => onChange(event.currentTarget.value)}
      visibilityToggleButtonProps={{ 'aria-label': 'Hiện hoặc ẩn mật khẩu', tabIndex: 0 }}
      visibilityToggleIcon={({ reveal }) => <span>{reveal ? 'Ẩn' : 'Hiện'}</span>}
    />
  );
}

export function PasswordRequirements({ password }: { password: string }) {
  const checks = [
    { label: `Ít nhất ${PASSWORD_MIN_LENGTH} ký tự`, met: password.length >= PASSWORD_MIN_LENGTH },
    { label: 'Có chữ hoa và chữ thường', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'Có chữ số', met: /\d/.test(password) },
    { label: 'Có ký tự đặc biệt', met: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((check) => check.met).length;
  const levels = ['Chưa có', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];
  return (
    <S.Stack>
      <S.Strength role="img" aria-label={`Độ mạnh mật khẩu: ${levels[score]}`}>
        {checks.map((check, index) => (
          <S.StrengthBar key={check.label} $on={index < score} />
        ))}
      </S.Strength>
      <S.Requirements aria-label="Yêu cầu mật khẩu">
        {checks.map((check) => (
          <S.Requirement key={check.label} $met={check.met}>
            <span aria-hidden="true">{check.met ? '✓' : '○'}</span> {check.label}
            <span hidden>{check.met ? ' (đã đạt)' : ' (chưa đạt)'}</span>
          </S.Requirement>
        ))}
      </S.Requirements>
    </S.Stack>
  );
}

interface CheckRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

export function CheckRow({ checked, onChange, children }: CheckRowProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
      label={children}
      variant="filled"
      color="#5f7d53"
      styles={{
        label: { fontSize: 14, lineHeight: 1.5, color: INK },
        input: { width: 20, height: 20, borderRadius: 5, borderColor: '#a9a28d' },
        icon: { width: 12 },
      }}
    />
  );
}

const PRIMARY_ROOT: CSSProperties = {
  height: 50,
  width: '100%',
  border: `1.5px solid ${INK}`,
  borderRadius: 12,
  background: '#9fbd91',
  boxShadow: `3px 4px 0 ${INK}`,
  color: INK,
  fontSize: 16,
  fontWeight: 700,
  transition: 'transform 0.15s, box-shadow 0.15s, background 0.15s',
};

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  idleLabel: string;
  loadingLabel: string;
}

export function SubmitButton({ loading, disabled, idleLabel, loadingLabel }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="auth-primary"
      disabled={loading || disabled}
      aria-busy={loading}
      leftSection={loading ? <Loader size={18} color={INK} aria-hidden="true" /> : undefined}
      styles={{ root: PRIMARY_ROOT, label: { fontSize: 16, fontWeight: 700 } }}
    >
      {loading ? loadingLabel : idleLabel}
    </Button>
  );
}

const PROVIDERS = [
  { name: 'Google', icon: <FcGoogle size={20} /> },
  { name: 'Facebook', icon: <FaFacebookF size={18} color="#1877f2" /> },
  { name: 'GitHub', icon: <FaGithub size={20} /> },
];

export function SocialLoginButtons({ onSelect }: { onSelect: (provider: string) => void }) {
  return (
    <S.SocialGrid>
      {PROVIDERS.map(({ name, icon }) => (
        <Button
          key={name}
          type="button"
          className="auth-social"
          aria-label={`Tiếp tục với ${name}`}
          onClick={() => onSelect(name)}
          leftSection={<span aria-hidden="true">{icon}</span>}
          styles={{
            root: {
              height: 48,
              padding: '0 8px',
              border: '1.5px solid #cfc8b5',
              borderRadius: 10,
              background: '#fff',
              color: INK,
              fontSize: 14,
              fontWeight: 600,
            },
            section: { marginInlineEnd: 8 },
          }}
        >
          <span className="auth-social-label">{name}</span>
        </Button>
      ))}
    </S.SocialGrid>
  );
}
