import { Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface HeaderNavItemProps {
  href: string;
  label: string;
  icon: IconType;
  mobile?: boolean;
}

export default function HeaderNavItem({
  href,
  label,
  icon: Icon,
  mobile = false,
}: HeaderNavItemProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        width: mobile ? '100%' : undefined,
      }}
    >
      <Flex
        align="center"
        gap={mobile ? 14 : 10}
        c="white"
        px={mobile ? 16 : 0}
        py={mobile ? 14 : 0}
        style={{
          borderRadius: mobile ? 10 : 8,
          minHeight: mobile ? 52 : undefined,
          transition: 'background-color 150ms ease',
        }}
        className={mobile ? 'mobile-nav-item' : undefined}
      >
        <Icon size={18} />

        <Text fz={16} fw={500}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
}
