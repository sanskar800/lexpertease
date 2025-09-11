import { z } from 'zod';
import { router, procedure, protectedProcedure } from '../trpc/trpc';
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/auth';
import { AuthService } from '../services/authService';
import { emailService } from '../services/emailService';
import { handleTRPCError } from '../utils/errors';

export const authRouter = router({
  signup: procedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await AuthService.signup(input);
        return {
          success: true,
          message: 'Account created successfully',
          data: {
            user: result.user,
            token: result.token,
            refreshToken: result.refreshToken,
          },
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  login: procedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await AuthService.login(input);
        return {
          success: true,
          message: 'Login successful',
          data: {
            user: result.user,
            token: result.token,
            refreshToken: result.refreshToken,
          },
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  logout: protectedProcedure
    .input(z.object({
      refreshToken: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await AuthService.logout(ctx.user._id.toString(), input.refreshToken);
        return {
          success: true,
          message: 'Logout successful',
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  refreshToken: procedure
    .input(z.object({
      refreshToken: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        const result = await AuthService.refreshToken(input.refreshToken);
        return {
          success: true,
          message: 'Token refreshed successfully',
          data: {
            token: result.token,
            refreshToken: result.refreshToken,
          },
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  me: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const user = await AuthService.getCurrentUser(ctx.user._id.toString());
        return {
          success: true,
          data: { user },
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1).max(50).optional(),
      lastName: z.string().min(1).max(50).optional(),
      phone: z.string().min(10).max(15).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await AuthService.updateProfile(ctx.user._id.toString(), input);
        return {
          success: true,
          message: 'Profile updated successfully',
          data: { user },
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  changePassword: protectedProcedure
    .input(z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(8).max(128),
      confirmPassword: z.string(),
    }).refine(data => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await AuthService.changePassword(
          ctx.user._id.toString(),
          input.currentPassword,
          input.newPassword
        );
        return {
          success: true,
          message: 'Password changed successfully',
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  forgotPassword: procedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input }) => {
      try {
        await AuthService.forgotPassword(input.email);
        return {
          success: true,
          message: 'If an account with that email exists, we have sent a password reset link.',
        };
      } catch (error) {
        // Don't expose whether the email exists or not for security
        return {
          success: true,
          message: 'If an account with that email exists, we have sent a password reset link.',
        };
      }
    }),

  resetPassword: procedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      try {
        await AuthService.resetPassword(input.token, input.password);
        return {
          success: true,
          message: 'Password reset successfully. You can now log in with your new password.',
        };
      } catch (error) {
        handleTRPCError(error);
      }
    }),

  // Development/Testing endpoint to check email configuration
  testEmail: procedure
    .input(z.object({
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      try {
        if (process.env.NODE_ENV !== 'development') {
          throw new Error('This endpoint is only available in development mode');
        }
        
        const isConnected = await emailService.testConnection();
        if (!isConnected) {
          throw new Error('SMTP connection failed. Please check your email configuration.');
        }

        await emailService.sendEmail({
          to: input.email,
          subject: 'LexpertEase - Email Test',
          html: '<h1>Email Test Successful!</h1><p>Your email configuration is working correctly.</p>',
          text: 'Email Test Successful! Your email configuration is working correctly.',
        });

        return {
          success: true,
          message: 'Test email sent successfully',
        };
      } catch (error) {
        console.error('Email test failed:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to send test email');
      }
    }),
});