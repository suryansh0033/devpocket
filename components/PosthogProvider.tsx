'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PosthogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_tJKWMJRDSH9wXTDcKvLG89G33JQDYqvDT3awBy2JcJ2S', {
      api_host: 'https://us.i.posthog.com',
      capture_pageview: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}