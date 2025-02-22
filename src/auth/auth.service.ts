import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }

  async login(email: string, password: string): Promise<{ access_token: string, user: User }> {
    const user = await this.usersService.validateUser(email, password);
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates 100000-999999   
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    // Store OTP and expiry with the user
    await this.usersService.update(user._id, {
      resetOtp: otp,
      resetOtpExpiry: otpExpiry
    });

    // Send OTP via email
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <p style="font-size: 16px; line-height: 1.5;">
            Your password reset OTP is <strong>${otp}</strong>. 
            This OTP expires in 15 minutes. Use it to reset your password in the app.
          </p>
        </body>
      </html>
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset OTP',
        html: htmlContent,
      });
    } catch (error) {
      throw new BadRequestException('Failed to send reset OTP');
    }
  }

  async resetPassword(otp: number, newPassword: string): Promise<void> {
    try {
      const user = await this.usersService.findByOtp(otp);
      if (!user) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const now = new Date();
      if (now > user?.resetOtpExpiry!) {
        throw new BadRequestException('OTP has expired');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await this.usersService.update(user._id, {
        password: hashedPassword,
        resetOtp: null,
        resetOtpExpiry: null
      });
    } catch (error) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  }
}