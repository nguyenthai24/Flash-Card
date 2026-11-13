'use client';

import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthApiError } from '../services/auth.service';

type NoticeTone = 'info' | 'success' | 'error';

const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_ALREADY_EXISTS: 'Email này đã được sử dụng.',
  EMAIL_NOT_VERIFIED: 'Vui lòng xác minh email trước khi đăng nhập.',
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu chưa chính xác.',
  INVALID_OR_EXPIRED_TOKEN: 'Liên kết không hợp lệ hoặc đã hết hạn.',
  ACCOUNT_TEMPORARILY_LOCKED: 'Tài khoản tạm khóa. Vui lòng thử lại sau 15 phút.',
};

export function useAuthAction() {
  const [notice, setNotice] = useState('');
  const [noticeTone, setNoticeTone] = useState<NoticeTone>('info');
  const { isPending, mutate } = useMutation({
    mutationFn: (variables: {
      operation: () => Promise<unknown>;
      successMessage?: string;
      onSuccess?: () => void;
      onError?: () => void;
    }) => variables.operation(),
    onSuccess: (_result, variables) => {
      setNotice(variables.successMessage ?? '');
      setNoticeTone(variables.successMessage ? 'success' : 'info');
      variables.onSuccess?.();
    },
    onError: (error: Error, variables) => {
      const code = error instanceof AuthApiError ? error.code : undefined;
      setNotice((code && ERROR_MESSAGES[code]) || error.message);
      setNoticeTone('error');
      variables.onError?.();
    },
  });

  const run = useCallback((
    operation: () => Promise<unknown>,
    options?: {
      successMessage?: string;
      onSuccess?: () => void;
      onError?: () => void;
    },
  ) => {
    setNotice('');
    setNoticeTone('info');
    mutate({ operation, ...options });
  }, [mutate]);

  return {
    loading: isPending,
    notice,
    noticeTone,
    run,
    setNotice,
    clearNotice: useCallback(() => setNotice(''), []),
  };
}
