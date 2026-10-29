import type { Metadata } from 'next';
import { ForgotPasswordScreen } from '~/features/auth/screens';

export const metadata: Metadata = {
  title: { absolute: 'Quên mật khẩu | FlashCard' },
};

export default function LegacyForgotPasswordPage() {
  return <ForgotPasswordScreen />;
}
