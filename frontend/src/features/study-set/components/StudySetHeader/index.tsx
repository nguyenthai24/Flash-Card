import { Button, Flex, Stack } from '@mantine/core';
import Link from 'next/link';
import { PATHS } from '~/constants';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import AnchorCustom from '~/components/MantineCustom/AnchorCustom';

interface StudySetHeaderProps {}

function StudySetHeader({}: StudySetHeaderProps) {
  return (
    <Stack>
      <Flex justify={'space-between'}>
        <Link
          href={PATHS.HOME}
          style={{
            textDecoration: 'none',
          }}
        >
          Quay lại
        </Link>

        <Button variant="outline" leftSection={<FaCalendarAlt size={18} />}>
          Lặp lại ngắt quãng
        </Button>
      </Flex>
    </Stack>
  );
}

export default StudySetHeader;
