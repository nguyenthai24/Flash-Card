import { ActionIcon, Flex, Text } from '@mantine/core';
import { IoMdPhotos } from 'react-icons/io';
import { VscReport } from 'react-icons/vsc';

export default function HeaderAction() {
  return (
    <Flex align="center" gap={28}>
      <Flex
        align="center"
        gap={8}
        c="white"
        style={{
          cursor: 'pointer',
        }}
      >
        <IoMdPhotos size={17} />

        <Text size="sm">Đổi hình nền</Text>
      </Flex>

      <Flex
        align="center"
        gap={8}
        c="white"
        style={{
          cursor: 'pointer',
        }}
      >
        <VscReport size={17} />

        <Text size="sm">Góp ý / Báo lỗi</Text>
      </Flex>
    </Flex>
  );
}
