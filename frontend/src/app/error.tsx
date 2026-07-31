'use client';

import { useEffect } from 'react';
import image_500 from '~/assets/images/500.png';
import NotFound from './not-found';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('error: ', error);
  }, [error]);

  return <NotFound image={image_500} />;
}
