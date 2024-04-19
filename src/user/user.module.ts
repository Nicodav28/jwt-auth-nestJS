import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, UserRepository, JwtService],
  controllers: [UserController],
})
export class UserModule {}
