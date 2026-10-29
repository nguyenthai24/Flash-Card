import type { Metadata } from 'next';
import { LoginScreen } from '~/features/auth/screens';

export const metadata: Metadata = {
  title: { absolute: 'Đăng nhập | FlashCard' },
  description: 'Tiếp tục hành trình học tiếng Anh cùng FlashCard.',
};

export default function SignInPage() {
  return <LoginScreen />;
}
