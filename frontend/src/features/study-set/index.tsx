import { Container, Stack } from '@mantine/core';
import StudySetHeader from './components/StudySetHeader';
import StudyModeNavigation from './components/StudyModeNavigation';
import FlashCardViewer from './components/FlashCardViewer';
import StudyWordSection from './components/StudyWordSection';

interface IStudySetProps {
  id: string;
}

export default async function StudySet({ id }: IStudySetProps) {
  return (
    <Container flex={1} py={20}>
      <Stack>
        <StudySetHeader />
        <StudyModeNavigation />
        <FlashCardViewer word="123" pronunciation="noun-/ˈkʌpəl/" />
        <StudyWordSection
          title="Đang học"
          words={[
            {
              id: '2',
              word: 'mother',
              partOfSpeech: 'noun',
              pronunciation: '/ˈmʌðər/',
              meaning: 'mẹ',
              example: 'My mother is in the kitchen.',
            },
          ]}
        />
        <StudyWordSection title="Đã thành thạo" />
      </Stack>
    </Container>
  );
}
