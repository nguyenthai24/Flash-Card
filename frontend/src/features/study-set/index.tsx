import { Container } from '@mantine/core';
import StudySetHeader from './components/StudySetHeader';

interface IStudySetProps {
  id: string;
}

export default async function StudySet({ id }: IStudySetProps) {
  return (
    <Container flex={1}>
      <StudySetHeader />
    </Container>
  );
}
