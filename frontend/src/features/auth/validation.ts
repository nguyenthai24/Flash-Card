export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

export const getEmailError = (value: string): string => {
  const email = value.trim();
  if (!email) return 'Vui lòng nhập email.';
  if (!EMAIL_PATTERN.test(email)) return 'Email chưa đúng định dạng, ví dụ: ban@email.com.';
  return '';
};

export const getPasswordError = (value: string): string =>
  value ? '' : 'Vui lòng nhập mật khẩu.';

export const getNewPasswordError = (value: string): string => {
  if (!value) return 'Vui lòng nhập mật khẩu.';
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Mật khẩu cần có ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`;
  return '';
};

export const getConfirmPasswordError = (password: string, confirm: string): string => {
  if (!confirm) return 'Vui lòng nhập lại mật khẩu.';
  if (confirm !== password) return 'Mật khẩu nhập lại chưa khớp.';
  return '';
};
