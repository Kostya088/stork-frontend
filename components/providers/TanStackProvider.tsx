'use client';

import { useState } from 'react';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

type TanStackProviderProps = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
};

export default function TanStackProvider({
  children,
  dehydratedState,
}: TanStackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
