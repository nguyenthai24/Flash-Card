import type { Metadata } from 'next';
import { ForgotPasswordScreen } from '~/features/auth/forgot-password';

export const metadata: Metadata = {
  title: { absolute: 'Quên mật khẩu | FlashCard' },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordScreen />;
}
