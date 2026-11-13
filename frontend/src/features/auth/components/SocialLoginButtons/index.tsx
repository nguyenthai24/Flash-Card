'use client';

import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ink } from '../../common/tokens';
import * as S from './styled';

const PROVIDERS = [
  { id: 'google', name: 'Google', icon: <FcGoogle size={20} /> },
  { id: 'facebook', name: 'Facebook', icon: <FaFacebookF size={18} color="#1877f2" /> },
  { id: 'github', name: 'GitHub', icon: <FaGithub size={20} /> },
];

export function SocialLoginButtons({
  providers,
  onSelect,
}: {
  providers?: string[];
  onSelect: (provider: string) => void;
}) {
  return (
    <S.SocialGrid>
      {PROVIDERS.filter(({ id }) => !providers || providers.includes(id)).map(({ id, name, icon }) => (
        <S.SocialButton
          key={id}
          type="button"
          aria-label={`Tiếp tục với ${name}`}
          onClick={() => onSelect(id)}
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
