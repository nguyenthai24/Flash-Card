import type { Metadata } from 'next';
import { OAuthCallbackScreen } from '~/features/auth/oauth-callback';

export const metadata: Metadata = {
  title: { absolute: 'Đăng nhập mạng xã hội | FlashCard' },
};

interface OAuthCallbackPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OAuthCallbackPage({ searchParams }: OAuthCallbackPageProps) {
  const { status } = await searchParams;
  const value = Array.isArray(status) ? status[0] : status;
  return <OAuthCallbackScreen status={value} />;
}
