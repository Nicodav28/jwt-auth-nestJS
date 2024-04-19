import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AbstractRepositoryImpl } from 'src/libs/common/database/abstract-repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository extends AbstractRepositoryImpl<User> {
  model = 'user';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
