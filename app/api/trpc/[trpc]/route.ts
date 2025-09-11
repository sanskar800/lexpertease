import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/routers';
import { createContext } from '../../../../server/trpc/context';
import { connectDB } from '../../../../server/config/database';

// Initialize database connection
connectDB();

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: (opts) => createContext(opts as any),
  });

export { handler as GET, handler as POST };