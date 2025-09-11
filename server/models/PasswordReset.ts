import mongoose, { Document, Schema } from 'mongoose';

export interface IPasswordReset extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const passwordResetSchema = new Schema<IPasswordReset>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for automatic cleanup and better query performance
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
passwordResetSchema.index({ userId: 1 });
passwordResetSchema.index({ token: 1 });

export const PasswordReset = mongoose.models.PasswordReset || mongoose.model<IPasswordReset>('PasswordReset', passwordResetSchema);