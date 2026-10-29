import type { Metadata } from 'next';
import { OAuthCallbackScreen } from '~/features/auth/screens';

export const metadata: Metadata = {
  title: { absolute: 'Đăng nhập mạng xã hội | FlashCard' },
};

export default function OAuthCallbackPage() {
  return <OAuthCallbackScreen />;
}
