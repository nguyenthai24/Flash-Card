import { useEffect } from 'react';
import { LOCALSTORAGE_KEYS } from '~/constants';

/**
 * @hook
 * @description Listen for token changes
 */
const useTokenChange = () => {
  // In case of opening multiple tabs => reload the entire tab when there is a token change
  useEffect(() => {
    // không cần reload trong webview

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCALSTORAGE_KEYS.ACCESS_TOKEN) {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null;
};

export default useTokenChange;
