import { Box } from '@mantine/core';
import { headers } from 'next/headers';
import { PropsWithChildren, Suspense } from 'react';
import Footer from '../Footer';

import { theme } from '~/constants';
import Header from '../Header';

export interface IMainLayoutProps extends PropsWithChildren {}

export default async function MainLayout({ children }: Readonly<IMainLayoutProps>) {
  // const headerList = await headers();
  // const isSDK = headerList.get('x-is-sdk') === 'true';

  return (
    <Suspense>
      <Header />

      <Box
        style={{
          marginTop: theme.sizes.HEADER_HEIGHT,
          flex: 1,
          backgroundColor: theme.colors.BG_MAIN,
          position: 'relative',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Suspense>
  );
}
