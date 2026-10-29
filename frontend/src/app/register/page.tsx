import type { Metadata } from 'next';
import { RegistrationScreen } from '~/features/auth/screens';

export const metadata: Metadata = {
  title: { absolute: 'Tạo tài khoản | FlashCard' },
};

export default function RegisterPage() {
  return <RegistrationScreen />;
}
