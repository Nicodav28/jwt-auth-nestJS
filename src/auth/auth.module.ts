import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    UserService,
    PrismaService,
    UserRepository,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
