import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDTO) {
    return await this.userService.create(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDTO) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(@Request() request) {
    return await this.authService.refreshToken(request.user);
  }
}
