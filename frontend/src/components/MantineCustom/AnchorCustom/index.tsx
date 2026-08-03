// components/MantineCustom/Link.tsx

import { Anchor, AnchorProps } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AppLinkProps extends AnchorProps {
  href: string;
  children: ReactNode;
}

export default function AnchorCustom({ href, children, ...props }: AppLinkProps) {
  return (
    <Anchor
      component={Link}
      href={href}
      px="sm"
      py={6}
      style={{
        border: '1px solid transparent',
        borderRadius: 6,
        textDecoration: 'none',
        transition: 'all 150ms ease',
      }}
      styles={{
        root: {
          '&:hover': {
            borderColor: '#ccc',
            backgroundColor: '#f5f5f5',
          },
        },
      }}
      {...props}
    >
      {children}
    </Anchor>
  );
}
