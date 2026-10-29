import type { Metadata } from 'next';
import { VerifyEmailScreen } from '~/features/auth/screens';

export const metadata: Metadata = {
  title: { absolute: 'Xác minh email | FlashCard' },
};

export default function VerifyEmailPage() {
  return <VerifyEmailScreen />;
}
