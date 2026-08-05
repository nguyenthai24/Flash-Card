import { Container, Stack } from '@mantine/core';
import StudySetHeader from './components/StudySetHeader';
import StudyModeNavigation from './components/StudyModeNavigation';
import FlashCardViewer from './components/FlashCardViewer';

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
      </Stack>
    </Container>
  );
}
