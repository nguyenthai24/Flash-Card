import type { Metadata } from 'next';
import { ResetPasswordScreen } from '~/features/auth/screens';

interface LegacyResetPasswordPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: { absolute: 'Đặt mật khẩu mới | FlashCard' },
};

export default async function LegacyResetPasswordPage({
  searchParams,
}: LegacyResetPasswordPageProps) {
  const { token } = await searchParams;
  return <ResetPasswordScreen hasToken={Boolean(token && (!Array.isArray(token) || token.length))} />;
}
