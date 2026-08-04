import { Container, Stack } from '@mantine/core';
import StudySetHeader from './components/StudySetHeader';
import StudyModeNavigation from './components/StudyModeNavigation';

interface IStudySetProps {
  id: string;
}

export default async function StudySet({ id }: IStudySetProps) {
  return (
    <Container flex={1} py={20}>
      <Stack>
        <StudySetHeader />
        <StudyModeNavigation />
      </Stack>
    </Container>
  );
}
