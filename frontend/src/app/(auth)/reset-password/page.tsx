import type { Metadata } from 'next';
import { ResetPasswordScreen } from '~/features/auth/reset-password';

interface ResetPasswordPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: { absolute: 'Đặt mật khẩu mới | FlashCard' },
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;
  return <ResetPasswordScreen token={Array.isArray(token) ? token[0] ?? null : token ?? null} />;
}
