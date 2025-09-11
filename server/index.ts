import { connectDB } from './config/database';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './trpc/context';
import { appRouter } from './routers';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL 
      : 'http://localhost:3000',
    credentials: true,
  }),
});

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    server.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📖 API documentation available at http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export { appRouter };