'use client';

import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ink } from '../../common/tokens';
import * as S from './styled';

const PROVIDERS = [
  { name: 'Google', icon: <FcGoogle size={20} /> },
  { name: 'Facebook', icon: <FaFacebookF size={18} color="#1877f2" /> },
  { name: 'GitHub', icon: <FaGithub size={20} /> },
];

export function SocialLoginButtons({ onSelect }: { onSelect: (provider: string) => void }) {
  return (
    <S.SocialGrid>
      {PROVIDERS.map(({ name, icon }) => (
        <S.SocialButton
          key={name}
          type="button"
          aria-label={`Tiếp tục với ${name}`}
          onClick={() => onSelect(name)}
          leftSection={<span aria-hidden="true">{icon}</span>}
          styles={{
            root: {
              height: 48,
              padding: '0 8px',
              border: '1.5px solid #cfc8b5',
              borderRadius: 10,
              background: '#fff',
              color: ink,
              fontSize: 14,
              fontWeight: 600,
            },
            section: { marginInlineEnd: 8 },
          }}
        >
          <S.SocialLabel>{name}</S.SocialLabel>
        </S.SocialButton>
      ))}
    </S.SocialGrid>
  );
}
