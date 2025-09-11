import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';

export interface Context {
  user?: IUser;
  token?: string;
}

export const createContext = async (opts: CreateNextContextOptions): Promise<Context> => {
  const { req } = opts;
  
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies?.token ||
                req.headers['x-auth-token'] as string;

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