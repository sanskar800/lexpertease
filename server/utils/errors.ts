import { TRPCError } from '@trpc/server';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const handleTRPCError = (error: unknown): never => {
  if (error instanceof AuthError) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: error.message,
    });
  }

  if (error instanceof ValidationError) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
    });
  }

  if (error instanceof DatabaseError) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Database operation failed',
    });
  }

  if (error instanceof Error) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message,
      });
    }

    // Handle mongoose duplicate key errors
    if (error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email address is already registered',
      });
    }
  }

  // Default error
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  });
};