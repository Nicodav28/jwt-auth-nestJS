import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginUserDto: LoginUserDTO) {
    const user = await this.validateUser(loginUserDto);

    return this.generateTokens(user);
  }

  public async refreshToken(user: any) {
    return this.generateTokens(user);
  }

  private async validateUser(loginUserDto: LoginUserDTO) {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (!user || !(await compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    return user;
  }

  private async generateTokens(user: any) {
    const payload: object = {
      username: user.email || user.username,
      sub: {
        name: user.name || user.sub.name,
      },
    };

    const accessToken = await this.generateToken(
      payload,
      '1h',
      process.env.JWT_SECRET_KEY,
    );

    const refreshToken = await this.generateToken(
      payload,
      '7d',
      process.env.JWT_REFRESH_TOKEN,
    );

    return {
      user,
      backendTokens: { accessToken, refreshToken },
    };
  }

  private async generateToken(
    payload: object,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
  }
}
