'use client';

import type { ReactNode } from 'react';
import { authBodyFont, authHeadingFont } from '../../common/fonts';
import * as S from './styled';

interface AuthShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, footer, children }: AuthShellProps) {
  return (
    <S.Page className={`${authHeadingFont.variable} ${authBodyFont.variable}`}>
      <S.Brand href="/login" aria-label="FlashCard - về trang đăng nhập">
        <S.BrandMark aria-hidden="true">✦</S.BrandMark>
        FlashCard
      </S.Brand>
      <S.Sheet>
        <S.Aside aria-hidden="true">
          <S.Kicker>✦ Học từ vựng mỗi ngày</S.Kicker>
          <S.AsideTitle>
            Tiếng Anh <span>dễ nhớ</span>, vui hơn.
          </S.AsideTitle>
          <S.WordCard>
            <strong>curiosity</strong>
            <small>/ˌkjʊəriˈɒsəti/ · sự tò mò</small>
            <span>Curiosity helps you learn faster.</span>
          </S.WordCard>
          <S.AsideNote>Học theo nhịp độ của riêng bạn.</S.AsideNote>
        </S.Aside>
        <S.Panel>
          <S.PanelInner>
            {eyebrow && <S.Eyebrow>{eyebrow}</S.Eyebrow>}
            <S.Title>{title}</S.Title>
            <S.Intro>{description}</S.Intro>
            {children}
            {footer && <S.Footer>{footer}</S.Footer>}
          </S.PanelInner>
        </S.Panel>
      </S.Sheet>
    </S.Page>
  );
}
