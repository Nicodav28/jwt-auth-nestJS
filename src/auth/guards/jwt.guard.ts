import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractHeaderToken(request);

      if (!token) {
        throw new UnauthorizedException('Unauthorized access.');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractHeaderToken(request: Request) {
    try {
      const [type, token] = request.headers.authorization.split(' ') ?? [];

      return type === 'Bearer' ? token : undefined;
    } catch (error) {
      throw new UnauthorizedException('Bearer token not provided.');
    }
  }
}
