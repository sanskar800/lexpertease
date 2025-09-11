import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Token expires in 7 days
    issuer: 'lexpertease',
    audience: 'lexpertease-users'
  });
};

export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'lexpertease',
      audience: 'lexpertease-users'
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};

export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { userId, type: 'refresh' },
    secret,
    {
      expiresIn: '30d', // Refresh token expires in 30 days
      issuer: 'lexpertease',
      audience: 'lexpertease-refresh'
    }
  );
};