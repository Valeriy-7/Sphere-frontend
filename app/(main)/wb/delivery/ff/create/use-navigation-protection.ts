'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useNavigationProtection(shouldPreventNavigation: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = useRef(pathname);

  // Store the callback in a ref so we can access it in event listeners
  const preventNavigationRef = useRef(shouldPreventNavigation);

  useEffect(() => {
    preventNavigationRef.current = shouldPreventNavigation;
  }, [shouldPreventNavigation]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (preventNavigationRef.current) {
        // Prevent the navigation
        e.preventDefault();
        // Stay on the current URL
        window.history.pushState(null, '', currentPath.current);
        // Return true to indicate navigation was prevented
        return true;
      }
      return false;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle browser/tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (preventNavigationRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Function to navigate safely
  const navigate = useCallback(
    (url: string) => {
      if (!preventNavigationRef.current) {
        router.push(url);
        return true;
      }
      return false;
    },
    [router],
  );

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!preventNavigationRef.current) {
        router.push(url);
        return true;
      }
      return false;
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return { navigate };
}
