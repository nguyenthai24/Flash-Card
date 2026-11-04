'use client';

import { PASSWORD_MIN_LENGTH } from '../../common/validation';
import { AuthStack } from '../AuthStack';
import * as S from './styled';

export function PasswordRequirements({ password }: { password: string }) {
  const checks = [
    { label: `Ít nhất ${PASSWORD_MIN_LENGTH} ký tự`, met: password.length >= PASSWORD_MIN_LENGTH },
    { label: 'Có chữ hoa và chữ thường', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'Có chữ số', met: /\d/.test(password) },
    { label: 'Có ký tự đặc biệt', met: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((check) => check.met).length;
  const levels = ['Chưa có', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];
  return (
    <AuthStack>
      <S.Strength role="img" aria-label={`Độ mạnh mật khẩu: ${levels[score]}`}>
        {checks.map((check, index) => (
          <S.StrengthBar key={check.label} $on={index < score} />
        ))}
      </S.Strength>
      <S.Requirements aria-label="Yêu cầu mật khẩu">
        {checks.map((check) => (
          <S.Requirement key={check.label} $met={check.met}>
            <span aria-hidden="true">{check.met ? '✓' : '○'}</span> {check.label}
            <span hidden>{check.met ? ' (đã đạt)' : ' (chưa đạt)'}</span>
          </S.Requirement>
        ))}
      </S.Requirements>
    </AuthStack>
  );
}
