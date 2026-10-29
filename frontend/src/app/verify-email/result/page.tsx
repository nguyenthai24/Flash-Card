import type { Metadata } from 'next';
import { VerifyEmailResultScreen } from '~/features/auth/screens';

interface VerifyEmailResultPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: { absolute: 'Kết quả xác minh | FlashCard' },
};

export default async function VerifyEmailResultPage({
  searchParams,
}: VerifyEmailResultPageProps) {
  const { result } = await searchParams;
  return <VerifyEmailResultScreen result={Array.isArray(result) ? result[0] : result} />;
}
