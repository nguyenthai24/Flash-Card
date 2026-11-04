'use client';

import { AuthLink, AuthNotice, AuthShell } from '../components';

export function OAuthCallbackScreen() {
  return (
    <AuthShell
      eyebrow="Đăng nhập mạng xã hội"
      title="Đang chờ tích hợp"
      description="Đây là trang nhận kết quả đăng nhập từ nhà cung cấp. Hiện chưa xử lý mã xác thực."
      footer={<AuthLink href="/login">← Quay lại đăng nhập</AuthLink>}
    >
      <AuthNotice tone="info" role="status">
        Chưa có phiên đăng nhập nào được tạo và không có dữ liệu nào được gửi đến backend.
      </AuthNotice>
    </AuthShell>
  );
}
