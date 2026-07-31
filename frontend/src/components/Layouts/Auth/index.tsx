'use client';

import { Overlay } from '@mantine/core';
import { PropsWithChildren, Suspense } from 'react';
import Header from '~/components/Layouts/Header';
import { getUserInfo } from '~/services/services.server';
import { Content, Wrapper } from './styled';
import UserInfo from './UserInfo';

export interface IAuthLayoutProps extends PropsWithChildren {}

export default async function AuthLayout({ children }: Readonly<IAuthLayoutProps>) {
  const user = await getUserInfo();
  return (
    <>
      <Header />
      <Suspense>
        <Wrapper>
          <Overlay color="#fff" backgroundOpacity={0.5} zIndex={99} />
          <Content>{user ? <UserInfo data={user} /> : children}</Content>
        </Wrapper>
      </Suspense>
    </>
  );
}
