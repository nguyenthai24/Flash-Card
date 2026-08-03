'use client';

import { Burger, Drawer, Flex, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoMdHome } from 'react-icons/io';
import { FaBook, FaFolder, FaUserFriends, FaMedal } from 'react-icons/fa';

import HeaderNavItem from './HeaderNavItem';
import { theme } from '~/constants';

export default function MobileHeaderNavigation() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Burger opened={opened} onClick={open} color="white" size="sm" />

      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
        title="Menu"
        styles={{
          content: {
            backgroundColor: theme.colors.BG_HEADER,
          },

          header: {
            backgroundColor: theme.colors.BG_HEADER,
          },

          body: {
            backgroundColor: theme.colors.BG_HEADER,
          },
        }}
      >
        <Stack gap={10}>
          <HeaderNavItem href="/" label="Trang chủ" icon={IoMdHome} />

          <HeaderNavItem href="/courses" label="Khoá học" icon={FaBook} />

          <HeaderNavItem href="/created" label="Đã tạo" icon={FaFolder} />

          <HeaderNavItem href="/classes" label="Lớp học" icon={FaUserFriends} />

          <HeaderNavItem href="/ranking" label="Xếp hạng" icon={FaMedal} />
        </Stack>
      </Drawer>
    </>
  );
}
