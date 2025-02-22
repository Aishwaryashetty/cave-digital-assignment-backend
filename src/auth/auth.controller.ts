import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResetPasswordDto, ResetPasswordRequestDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('reset-password-request')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body(ValidationPipe) resetRequestDto: ResetPasswordRequestDto) {
    await this.authService.requestPasswordReset(resetRequestDto.email);
    return { message: 'Password reset link has been sent to your email' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body(ValidationPipe) resetDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetDto.otp, resetDto.newPassword);
    return { message: 'Password has been successfully reset' };
  }
}