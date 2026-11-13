'use client';

import { useQuery } from '@tanstack/react-query';
import { AuthDivider, AuthNotice, AuthStack, SocialLoginButtons } from '../components';
import { authService, getOAuthUrl } from '../services/auth.service';

export type Touched<K extends string> = Record<K, boolean>;

export function SocialSection() {
  const { data: providers, isLoading, isError } = useQuery({
    queryKey: ['auth', 'oauth-providers'],
    queryFn: authService.oauthProviders,
    staleTime: 5 * 60_000,
  });

  return (
    <AuthStack>
      <AuthDivider>hoặc tiếp tục với</AuthDivider>
      {providers?.length ? <SocialLoginButtons providers={providers} onSelect={(provider) => {
        window.location.assign(getOAuthUrl(provider));
      }} /> : null}
      {!isLoading && !isError && !providers?.length && (
        <AuthNotice tone="info">Chưa có nhà cung cấp đăng nhập mạng xã hội nào được cấu hình.</AuthNotice>
      )}
      {isError && (
        <AuthNotice tone="error" role="alert">Không tải được phương thức đăng nhập mạng xã hội.</AuthNotice>
      )}
    </AuthStack>
  );
}

export function NoticeArea({
  message,
  tone = 'info',
}: {
  message: string;
  tone?: 'info' | 'success' | 'error';
}) {
  return (
    <div role="status" aria-live="polite">
      {message && <AuthNotice tone={tone} role={tone === 'error' ? 'alert' : 'status'}>{message}</AuthNotice>}
    </div>
  );
}
