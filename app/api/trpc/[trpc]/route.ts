import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/routers';
import { connectDB } from '../../../../server/config/database';
import { verifyToken, JWTPayload } from '../../../../server/utils/jwt';
import { User, IUser } from '../../../../server/models/User';
import type { NextRequest } from 'next/server';

// Initialize database connection
connectDB();

interface Context {
  user?: IUser;
  token?: string;
}

const createContext = async (opts: { req: NextRequest }): Promise<Context> => {
  const { req } = opts;
  
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || 
                req.headers.get('x-auth-token');

  if (!token) {
    return {};
  }

  try {
    const decoded: JWTPayload = verifyToken(token);
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      return {};
    }

    return {
      user,
      token
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return {};
  }
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext({ req }),
  });

export { handler as GET, handler as POST };