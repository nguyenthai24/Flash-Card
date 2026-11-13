'use client';

import { useEffect, useState } from 'react';
import { AuthLink, AuthNotice, AuthShell } from '../components';
import { authService } from '../services/auth.service';

export function OAuthCallbackScreen({ status }: { status?: string }) {
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(status === 'success');

  useEffect(() => {
    if (status !== 'success') return;
    let active = true;
    void authService.me()
      .then(() => {
        if (active) setSuccess(true);
      })
      .catch(() => {
        if (active) setSuccess(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [status]);

  return (
    <AuthShell
      eyebrow="Đăng nhập mạng xã hội"
      title={checking ? 'Đang hoàn tất đăng nhập' : success ? 'Đăng nhập thành công' : 'Không thể đăng nhập'}
      description={checking
        ? 'Đang kiểm tra phiên đăng nhập của bạn.'
        : success
        ? 'Phiên đăng nhập đã được tạo an toàn. Bạn có thể tiếp tục học.'
        : 'Nhà cung cấp không thể xác thực tài khoản. Vui lòng thử lại.'}
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthNotice
        tone={checking ? 'info' : success ? 'success' : 'error'}
        role={!checking && !success ? 'alert' : 'status'}
      >
        {checking ? 'Đang kiểm tra...' : success ? 'Bạn đã đăng nhập.' : 'Không có phiên đăng nhập nào được tạo.'}
      </AuthNotice>
      {success && <AuthLink href="/">Tiếp tục</AuthLink>}
    </AuthShell>
  );
}
