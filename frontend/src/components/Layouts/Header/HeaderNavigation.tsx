import { Flex } from '@mantine/core';
import { IoMdHome } from 'react-icons/io';
import { FaBook, FaFolder, FaUserFriends, FaMedal } from 'react-icons/fa';
import HeaderNavItem from './HeaderNavItem';

export default function HeaderNavigation() {
  return (
    <Flex align="center" gap={32}>
      <HeaderNavItem href="/" label="Trang chủ" icon={IoMdHome} />
      <HeaderNavItem href="/courses" label="Khoá học" icon={FaBook} />
      <HeaderNavItem href="/created" label="Đã tạo" icon={FaFolder} />
      <HeaderNavItem href="/classes" label="Lớp học" icon={FaUserFriends} />
      <HeaderNavItem href="/ranking" label="Xếp hạng" icon={FaMedal} />
    </Flex>
  );
}
