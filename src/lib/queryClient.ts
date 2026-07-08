import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes cache
      gcTime: 1000 * 60 * 10,
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 429) {
          console.error("Rate limit exceeded. Please wait.");
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});
