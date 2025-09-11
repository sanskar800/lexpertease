import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

// Auth middleware
export const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user || !ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
      token: ctx.token,
    },
  });
});

// Protected procedure for authenticated users
export const protectedProcedure = procedure.use(isAuthed);

// Admin middleware
export const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.user || !ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to perform this action',
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      token: ctx.token,
    },
  });
});

// Admin procedure for admin-only actions
export const adminProcedure = procedure.use(isAdmin);