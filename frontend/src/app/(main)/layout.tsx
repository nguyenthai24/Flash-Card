import { PropsWithChildren, Suspense } from 'react';
import MainLayout from '~/components/Layouts/Main';

export interface IMainLayoutPageProps extends PropsWithChildren {}

export default async function MainLayoutPage({ children }: Readonly<IMainLayoutPageProps>) {
  return (
    <MainLayout>
      <Suspense>{children}</Suspense>
    </MainLayout>
  );
}
