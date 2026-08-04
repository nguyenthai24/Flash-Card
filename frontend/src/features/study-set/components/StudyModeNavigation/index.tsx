'use client';

import { Button, Flex, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { PATHS, theme } from '~/constants';
import { FaCalendarAlt, FaSave } from 'react-icons/fa';

import AnchorCustom from '~/components/MantineCustom/AnchorCustom';
import { IoMdArrowRoundBack, IoMdShare } from 'react-icons/io';
import { HiDotsVertical } from 'react-icons/hi';
import { StyledButton } from './styled';

interface StudyModeNavigationProps {}

function StudyModeNavigation({}: StudyModeNavigationProps) {
  const handleClick = () => {};
  return (
    <Stack>
      <SimpleGrid cols={{ base: 2, sm: 3 }}>
        <StyledButton $active={true} onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Speaking
        </StyledButton>
        <StyledButton $active={true} onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Hội thoại
        </StyledButton>
        <StyledButton $active={true} onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Ngữ pháp
        </StyledButton>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 2, sm: 3 }}>
        <StyledButton $active={true} onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Đọc hiểu
        </StyledButton>
        <StyledButton onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Học
        </StyledButton>
        <StyledButton onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Kiểm tra
        </StyledButton>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 2, sm: 3 }}>
        <StyledButton onClick={() => {}} leftSection={<FaCalendarAlt size={16} />}>
          Nghe chép
        </StyledButton>
      </SimpleGrid>
    </Stack>
  );
}

export default StudyModeNavigation;
