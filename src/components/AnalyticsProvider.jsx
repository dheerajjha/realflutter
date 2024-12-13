'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics from '@/lib/analytics/service';

export default function AnalyticsProvider({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    // Track page view on route change
    if (pathname && isInitialized) {
      analytics.pageView(pathname);
    }
  }, [pathname, searchParams, isInitialized]);

  // Render children without any wrapper to avoid hydration issues
  return children;
} 