'use client';

import { Anchor, Button, Flex, Text } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IoMdPhotos } from 'react-icons/io';
import { VscReport } from 'react-icons/vsc';

import { authService } from '~/features/auth/services/auth.service';

export default function HeaderAction() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.me,
    retry: false,
    staleTime: 60_000,
  });
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['auth', 'me'] });
      await router.replace('/login');
    },
  });

  return (
    <Flex align="center" gap={24}>
      <Flex align="center" gap={8} c="white" style={{ cursor: 'pointer' }}>
        <IoMdPhotos size={17} />
        <Text size="sm">Đổi hình nền</Text>
      </Flex>

      <Flex align="center" gap={8} c="white" style={{ cursor: 'pointer' }}>
        <VscReport size={17} />
        <Text size="sm">Góp ý / Báo lỗi</Text>
      </Flex>

      {user ? (
        <Flex align="center" gap={12} c="white">
          <Text size="sm">{user.first_name}</Text>
          <Button
            variant="white"
            size="xs"
            loading={logout.isPending}
            onClick={() => logout.mutate()}
          >
            Đăng xuất
          </Button>
          {logout.isError && (
            <Text size="xs" c="red.2" role="alert">
              {logout.error.message}
            </Text>
          )}
        </Flex>
      ) : (
        <Flex align="center" gap={14}>
          <Anchor href="/login" c="white" size="sm">
            Đăng nhập
          </Anchor>
          <Button component="a" href="/register" size="xs">
            Đăng ký
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
