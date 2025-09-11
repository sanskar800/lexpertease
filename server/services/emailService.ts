import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'LexpertEase'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - LexpertEase</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 32px;
          }
          .logo h1 {
            color: #0F8BDB;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .content {
            margin-bottom: 32px;
          }
          .button {
            display: inline-block;
            background-color: #0F8BDB;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 16px 0;
          }
          .button:hover {
            background-color: #0c7cd1;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
          }
          .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            color: #92400e;
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>LexpertEase</h1>
          </div>
          
          <div class="content">
            <h2 style="color: #111827; margin-bottom: 16px;">Password Reset Request</h2>
            
            <p>Hello,</p>
            
            <p>We received a request to reset your password for your LexpertEase account. If you made this request, please click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #0F8BDB;">${resetUrl}</p>
            
            <div class="warning">
              <strong>Important:</strong> This password reset link will expire in 15 minutes for security reasons.
            </div>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>For security reasons, if you continue to receive these emails, please contact our support team immediately.</p>
          </div>
          
          <div class="footer">
            <p>This email was sent by LexpertEase</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Password Reset Request - LexpertEase
      
      Hello,
      
      We received a request to reset your password for your LexpertEase account.
      
      Please click the following link to reset your password:
      ${resetUrl}
      
      This link will expire in 15 minutes for security reasons.
      
      If you didn't request a password reset, please ignore this email.
      
      Best regards,
      LexpertEase Team
    `;

    await this.sendEmail({
      to: email,
      subject: 'Reset Your LexpertEase Password',
      html,
      text,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();