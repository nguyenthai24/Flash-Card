import type { Metadata } from 'next';
import { VerifyEmailResultScreen } from '~/features/auth/verify-email';

interface VerifyEmailResultPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: { absolute: 'Kết quả xác minh | FlashCard' },
};

export default async function VerifyEmailResultPage({
  searchParams,
}: VerifyEmailResultPageProps) {
  const { token } = await searchParams;
  return <VerifyEmailResultScreen token={Array.isArray(token) ? token[0] : token} />;
}
