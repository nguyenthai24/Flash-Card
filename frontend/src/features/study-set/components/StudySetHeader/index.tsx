import { Flex, Group, Stack, Text } from '@mantine/core';
import { PATHS, theme } from '~/constants';
import { FaCalendarAlt, FaSave } from 'react-icons/fa';

import AnchorCustom from '~/components/MantineCustom/AnchorCustom';
import { IoMdArrowRoundBack, IoMdShare } from 'react-icons/io';
import { HiDotsVertical } from 'react-icons/hi';
import { StyledButton } from './styled';

interface StudySetHeaderProps {}

function StudySetHeader({}: StudySetHeaderProps) {
  return (
    <Stack>
      <Group justify={'space-between'}>
        <AnchorCustom href={PATHS.HOME}>
          <Flex align={'center'} gap={10}>
            <IoMdArrowRoundBack size={14} color={theme.colors.WHITE} />
            <Text>Quay lại</Text>
          </Flex>
        </AnchorCustom>

        <StyledButton variant="outline" leftSection={<FaCalendarAlt size={18} />}>
          Lặp lại ngắt quãng
        </StyledButton>
      </Group>

      <Group justify={'space-between'}>
        <Text fz={20}>Title</Text>

        <Flex gap={10}>
          <FaSave size={18} />
          <IoMdShare size={18} />
          <HiDotsVertical size={18} />
        </Flex>
      </Group>
    </Stack>
  );
}

export default StudySetHeader;
