import { Box, Button, Flex, Group, Select, Text } from '@mantine/core';
import { FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { theme } from '~/constants';
import { GiProgression } from 'react-icons/gi';
import { IoMdArrowBack } from 'react-icons/io';
import { GrFormNextLink } from 'react-icons/gr';
import { LiaRandomSolid } from 'react-icons/lia';
import SelectCustom from '~/components/MantineCustom/SelectCustom';

interface FlashCardViewerProps {
  word: string;
  partOfSpeech?: string;
  pronunciation?: string;
}

export default function FlashCardViewer({
  word,
  partOfSpeech,
  pronunciation,
}: FlashCardViewerProps) {
  return (
    <Box
      flex={1}
      w={'100%'}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/*  */}
      <Box
        w={560}
        h={375}
        p={24}
        style={{
          position: 'relative',
          borderRadius: 20,
          backgroundColor: theme.colors.BG_BUTTON_1,
          border: `2px solid ${theme.colors.BORDER_1}`,
        }}
      >
        {/* Settings */}
        <HiAdjustmentsHorizontal
          size={18}
          style={{
            color: '#aeb4c5',
          }}
        />

        {/* Word */}
        <Flex h="100%" direction="column" align="center" justify="center">
          <Text fw={700} fz={28} c="white">
            {word}
          </Text>

          {(partOfSpeech || pronunciation) && (
            <Flex gap={10} mt={12} align="center">
              {partOfSpeech && (
                <Text fz={14} c="dimmed">
                  {partOfSpeech}
                </Text>
              )}

              {pronunciation && (
                <Text fz={14} c="dimmed" fs="italic">
                  - {pronunciation}
                </Text>
              )}
            </Flex>
          )}
        </Flex>

        {/* Actions */}
        <Flex
          align="center"
          gap={14}
          style={{
            position: 'absolute',
            right: 24,
            bottom: 16,
          }}
        >
          <Box
            w={40}
            h={40}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              color: '#1d2333',
              cursor: 'pointer',
            }}
          >
            <FaMicrophone size={20} />
          </Box>

          <Box
            w={40}
            h={40}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8b93a8',
              cursor: 'pointer',
            }}
          >
            <FaVolumeUp size={20} />
          </Box>
        </Flex>
      </Box>

      {/*  */}
      <Text my={10} fz={14} c={theme.colors.TEXT_1}>
        Phím tắt: ← → để chuyển thẻ •Space / Enter hoặc để lật thẻ
      </Text>
      {/*  */}
      <Box w={560}>
        <Group justify="space-between">
          <Button leftSection={<GiProgression size={14} />}>Tiến độ</Button>

          <Flex align={'center'} gap={20}>
            <Button>
              <IoMdArrowBack size={14} />
            </Button>
            <Text> 3 / 30</Text>

            <Button>
              <GrFormNextLink size={14} />
            </Button>
          </Flex>
          <Button>
            <LiaRandomSolid size={14} />
          </Button>
        </Group>
      </Box>
      {/*  */}

      <Group my={20} w={'100%'} justify="flex-end" align="flex-end">
        <SelectCustom
          w={200}
          placeholder="Pick value"
          data={[
            'Thứ tự gốc',
            'Được đánh dấu sao trước',
            'Chưa học trước',
            'Đang học trước',
            'Đã thành thạo trước',
          ]}
        />
      </Group>
    </Box>
  );
}
