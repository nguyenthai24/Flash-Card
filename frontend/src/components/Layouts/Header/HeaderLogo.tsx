import { Box, Text } from '@mantine/core';
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      style={{
        textDecoration: 'none',
      }}
    >
      <Box
        w={40}
        h={40}
        bg="#050b18"
        style={{
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text fw={800} size="sm" c="white">
          OQ
        </Text>
      </Box>
    </Link>
  );
}
