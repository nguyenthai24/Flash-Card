'use client';

import { MantineProvider as _MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { DatesProvider } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
// import 'mantine-react-table/styles.css';
import useTokenChange from '~/hooks/useTokenChange';
import { mantineTheme } from '~/theme';
import { GlobalStyle } from '~/theme/globalStyle';

export const MantineProvider = ({ children }: any) => {
  useTokenChange();

  return (
    <_MantineProvider theme={mantineTheme} classNamesPrefix="mantine">
      <ModalsProvider labels={{ confirm: 'Xác nhận', cancel: 'Hủy' }} modalProps={{ size: 440 }}>
        <DatesProvider settings={{ locale: 'vi' }}>{children}</DatesProvider>
      </ModalsProvider>
      <Notifications position="top-right" notificationMaxHeight={240} />
      <GlobalStyle />
    </_MantineProvider>
  );
};
