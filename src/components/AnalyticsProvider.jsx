'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics from '@/lib/analytics/service';

// Separate component for analytics tracking
function AnalyticsTracker({ isInitialized }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change
    if (pathname && isInitialized) {
      analytics.pageView(pathname);
    }
  }, [pathname, searchParams, isInitialized]);

  return null;
}

export default function AnalyticsProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize analytics on client side
    const initAnalytics = async () => {
      if (!isInitialized) {
        await analytics.initialize();
        setIsInitialized(true);
      }
    };

    initAnalytics();
  }, [isInitialized]);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker isInitialized={isInitialized} />
      </Suspense>
      {children}
    </>
  );
} 