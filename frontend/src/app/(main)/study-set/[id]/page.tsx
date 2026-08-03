import { Container, Stack, Title, Text } from '@mantine/core';
import StudySet from '~/features/study-set';

interface StudySetPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudySetPage({ params }: StudySetPageProps) {
  const { id } = await params;

  return <StudySet id={id} />;
}
