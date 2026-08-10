import { Box, Flex, Stack, Text } from '@mantine/core';
import { FaVolumeDown } from 'react-icons/fa';
import { IoIosEyeOff, IoIosStar } from 'react-icons/io';
// import StudyWordItem from './StudyWordItem';

interface StudyWord {
  id: string;
  word: string;
  partOfSpeech: string;
  pronunciation: string;
  meaning: string;
  example: string;
}

interface StudyWordSectionProps {
  title?: string;
  words?: StudyWord[];
}

export default function StudyWordSection({ title, words }: StudyWordSectionProps) {
  return (
    <Stack gap={16}>
      {/* Section header */}
      <Flex justify="space-between" align="center">
        <Text fw={700} fz={18} c="white">
          {title}
        </Text>

        <Flex align="center" gap={6} style={{ cursor: 'pointer' }}>
          <IoIosEyeOff size={17} />

          <Text fz={14} c="white">
            Ẩn bớt
          </Text>
        </Flex>
      </Flex>

      {/* Words */}
      <Stack gap={12}>
        {words?.map((word) => (
          <>
            <Box
              px={20}
              py={16}
              style={{
                borderRadius: 12,
                border: '1px solid rgba(74, 116, 170, 0.45)',
                backgroundColor: '#292d3d',
                boxShadow: '0 0 12px rgba(60, 120, 200, 0.12)',
              }}
            >
              <Flex align="stretch" justify="space-between">
                {/* Left */}
                <Box
                  style={{
                    flex: 1,
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Text fz={16} fw={500} c="white">
                    {word.word}
                  </Text>

                  <Text mt={4} fz={12} c="dimmed">
                    {word.partOfSpeech} - {word.pronunciation}
                  </Text>
                </Box>

                {/* Middle */}
                <Box
                  px={16}
                  style={{
                    flex: 1,
                  }}
                >
                  <Text fz={15} c="white">
                    {word.meaning}
                  </Text>

                  <Text mt={4} fz={12} c="dimmed" fs="italic">
                    {word.example}
                  </Text>
                </Box>

                {/* Actions */}
                <Flex align="center" gap={16} pl={16}>
                  <IoIosStar size={18} color="#d9deea" style={{ cursor: 'pointer' }} />

                  <FaVolumeDown size={18} color="#d9deea" style={{ cursor: 'pointer' }} />
                </Flex>
              </Flex>
            </Box>
          </>
        ))}
      </Stack>
    </Stack>
  );
}
