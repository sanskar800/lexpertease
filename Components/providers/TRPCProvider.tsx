"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from "react";
import type { ReactNode } from "react";
import type { AppRouter } from '../../server/routers';

interface TRPCProviderProps {
  children: ReactNode;
}

export default function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${typeof window !== 'undefined' ? '' : 'http://localhost:3000'}/api/trpc`,
        async headers() {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
      }),
    ],
  }));

  const trpc = createTRPCReact<AppRouter>();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
