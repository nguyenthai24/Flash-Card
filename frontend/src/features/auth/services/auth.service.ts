export interface AuthUser {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  role: string;
  email_verified_at?: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error_message?: string;
  code?: string;
  message?: string | string[];
}

export class AuthApiError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api').replace(/\/+$/, '');
let refreshRequest: Promise<boolean> | null = null;

async function sendRequest(path: string, body?: unknown): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  let response = await sendRequest(path, body);
  if (response.status === 401 && (path === '/auth/me' || path === '/auth/logout')) {
    const pendingRefresh = refreshRequest ??= sendRequest('/auth/refresh', {})
      .then((refreshResponse) => refreshResponse.ok)
      .finally(() => {
        refreshRequest = null;
      });
    if (await pendingRefresh) response = await sendRequest(path, body);
  }
  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok || result.success === false) {
    const message = Array.isArray(result.message)
      ? result.message.join(' ')
      : result.message ?? result.error_message ?? 'Đã có lỗi xảy ra. Vui lòng thử lại.';
    throw new AuthApiError(message, result.code);
  }
  return result.data;
}

export const authService = {
  register: (data: { email: string; password: string; re_password: string }) =>
    request<null>('/auth/register', data),
  login: (data: { email: string; password: string; rememberMe: boolean }) =>
    request<AuthUser>('/auth/login', data),
  logout: () => request<null>('/auth/logout', {}),
  me: () => request<AuthUser>('/auth/me'),
  refresh: () => request<AuthUser>('/auth/refresh', {}),
  verifyEmail: (token: string) => request<null>('/auth/verify-email', { token }),
  resendVerification: (email: string) =>
    request<null>('/auth/resend-verification', { email }),
  forgotPassword: (email: string) => request<null>('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string; re_password: string }) =>
    request<null>('/auth/reset-password', data),
  oauthProviders: () => request<string[]>('/auth/oauth/providers'),
};

export function getOAuthUrl(provider: string): string {
  return `${API_BASE_URL}/oauth/${provider.toLowerCase()}`;
}
