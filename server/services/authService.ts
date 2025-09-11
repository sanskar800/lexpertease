import { User, Session, PasswordReset, IUser } from '../models';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { AuthError, ValidationError, DatabaseError } from '../utils/errors';
import { SignupInput, LoginInput, ForgotPasswordInput } from '../schemas/auth';
import { emailService } from './emailService';
import crypto from 'crypto';

export class AuthService {
  static async signup(input: SignupInput): Promise<{ user: IUser; token: string; refreshToken: string }> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) {
        throw new AuthError('Email address is already registered');
      }

      // Create new user
      const user = new User({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        password: input.password,
        isVerified: true, // Auto-verify for now, implement email verification later if needed
      });

      await user.save();

      // Generate tokens
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user._id.toString());

      // Save refresh token session
      const session = new Session({
        userId: user._id,
        token: refreshToken,
        type: 'refresh',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      await session.save();

      // Return user without password
      const userObject = user.toJSON();
      
      return {
        user: userObject,
        token,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'ValidationError') {
          throw new ValidationError(error.message);
        }
        if (error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
          throw new AuthError('Email address is already registered');
        }
      }
      
      throw new DatabaseError('Failed to create user account');
    }
  }

  static async login(input: LoginInput): Promise<{ user: IUser; token: string; refreshToken: string }> {
    try {
      // Find user with password
      const user = await User.findOne({ email: input.email }).select('+password');
      if (!user) {
        throw new AuthError('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await user.comparePassword(input.password);
      if (!isPasswordValid) {
        throw new AuthError('Invalid email or password');
      }

      // Check if user is verified (skip for now since we auto-verify)
      // if (!user.isVerified) {
      //   throw new AuthError('Please verify your email address before logging in');
      // }

      // Generate tokens
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user._id.toString());

      // Revoke old refresh tokens for this user
      await Session.updateMany(
        { userId: user._id, type: 'refresh' },
        { isRevoked: true }
      );

      // Save new refresh token session
      const session = new Session({
        userId: user._id,
        token: refreshToken,
        type: 'refresh',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      await session.save();

      // Return user without password
      const userObject = user.toJSON();
      
      return {
        user: userObject,
        token,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new DatabaseError('Login failed');
    }
  }

  static async logout(userId: string, refreshToken?: string): Promise<void> {
    try {
      if (refreshToken) {
        // Revoke specific refresh token
        await Session.updateOne(
          { userId, token: refreshToken, type: 'refresh' },
          { isRevoked: true }
        );
      } else {
        // Revoke all refresh tokens for this user
        await Session.updateMany(
          { userId, type: 'refresh' },
          { isRevoked: true }
        );
      }
    } catch (error) {
      throw new DatabaseError('Logout failed');
    }
  }

  static async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      // Find and validate refresh token session
      const session = await Session.findOne({
        token: refreshToken,
        type: 'refresh',
        isRevoked: false,
        expiresAt: { $gt: new Date() }
      }).populate('userId');

      if (!session) {
        throw new AuthError('Invalid or expired refresh token');
      }

      const user = await User.findById(session.userId);
      if (!user) {
        throw new AuthError('User not found');
      }

      // Generate new tokens
      const newToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user._id.toString());

      // Revoke old refresh token
      session.isRevoked = true;
      await session.save();

      // Save new refresh token session
      const newSession = new Session({
        userId: user._id,
        token: newRefreshToken,
        type: 'refresh',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      await newSession.save();

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new DatabaseError('Token refresh failed');
    }
  }

  static async getCurrentUser(userId: string): Promise<IUser> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AuthError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new DatabaseError('Failed to get user information');
    }
  }

  static async updateProfile(userId: string, updates: Partial<Pick<IUser, 'firstName' | 'lastName' | 'phone'>>): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new AuthError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new ValidationError(error.message);
      }
      
      throw new DatabaseError('Failed to update profile');
    }
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId).select('+password');
      if (!user) {
        throw new AuthError('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        throw new AuthError('Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await user.save();

      // Revoke all refresh tokens to force re-login on all devices
      await Session.updateMany(
        { userId, type: 'refresh' },
        { isRevoked: true }
      );
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new DatabaseError('Failed to change password');
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // Don't reveal whether the email exists or not for security
        return;
      }

      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      // Invalidate any existing password reset tokens for this user
      await PasswordReset.updateMany(
        { userId: user._id, isUsed: false },
        { isUsed: true }
      );

      // Create new password reset record
      const passwordReset = new PasswordReset({
        userId: user._id,
        token: resetToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      });

      await passwordReset.save();

      // Send password reset email
      try {
        await emailService.sendPasswordResetEmail(email, resetToken);
        console.log(`Password reset email sent to ${email}`);
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        // For development/testing: Still log the token if email fails
        if (process.env.NODE_ENV === 'development') {
          console.log(`Development mode - Password reset token for ${email}: ${resetToken}`);
          console.log(`Reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`);
        }
        // Don't throw error to prevent revealing whether email exists
      }
      
    } catch (error) {
      throw new DatabaseError('Failed to process password reset request');
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Find valid password reset token
      const passwordReset = await PasswordReset.findOne({
        token,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      }).populate('userId');

      if (!passwordReset) {
        throw new AuthError('Invalid or expired password reset token');
      }

      const user = await User.findById(passwordReset.userId).select('+password');
      if (!user) {
        throw new AuthError('User not found');
      }

      // Update password
      user.password = newPassword;
      await user.save();

      // Mark the reset token as used
      passwordReset.isUsed = true;
      await passwordReset.save();

      // Revoke all refresh tokens to force re-login on all devices
      await Session.updateMany(
        { userId: user._id, type: 'refresh' },
        { isRevoked: true }
      );
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new DatabaseError('Failed to reset password');
    }
  }
}