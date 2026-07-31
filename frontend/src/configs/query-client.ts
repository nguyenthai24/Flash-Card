import { notifications } from '@mantine/notifications';
import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';
import { theme } from '~/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error: any) => {
        const errorData = error?.message ? JSON.parse(error?.message) : undefined;

        // Show error khi sử dụng server action
        if (errorData?.error_code !== 0 && errorData?.status === false) {
          notifications.show({
            title: 'Thất bại!',
            message: errorData?.error_message || 'Đã có lỗi xảy ra!',
            color: theme.colors.RED,
          });
        }
      },
    },
  },
});

export const getQueryClient = cache(() => queryClient);
