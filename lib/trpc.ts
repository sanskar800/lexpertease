import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/routers';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }
  
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }
  
  // assume localhost
  return `http://localhost:3000`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          
          // You can pass any HTTP headers you wish here
          async headers() {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            
            return {
              authorization: token ? `Bearer ${token}` : '',
            };
          },
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/react/reference/QueryClient
       **/
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (error?.data?.httpStatus >= 400 && error?.data?.httpStatus < 500) {
                return false;
              }
              // Retry on other errors up to 3 times
              return failureCount < 3;
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
          mutations: {
            retry: (failureCount, error: any) => {
              // Don't retry mutations on 4xx errors
              if (error?.data?.httpStatus >= 400 && error?.data?.httpStatus < 500) {
                return false;
              }
              // Retry on network errors
              return failureCount < 1;
            },
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});