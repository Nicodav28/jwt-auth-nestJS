// abstract-repository.ts

import { PrismaService } from 'src/prisma.service';
import { AbstractRepository } from './abstract-repository.interface';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepositoryImpl<T>
  implements AbstractRepository<T>
{
  constructor(protected readonly prisma: PrismaService) {}

  abstract model: string;

  async findAll(): Promise<T[]> {
    const result = this.prisma[this.model].findMany();

    if (!result) {
      throw new NotFoundException('Register was not found');
    }

    return result;
  }

  async findById(id: number): Promise<T | null> {
    const result = this.prisma[this.model].findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      throw new NotFoundException('Register was not found');
    }

    return result;
  }

  async findByEmail(email: string): Promise<T | null> {
    const result = this.prisma[this.model].findUnique({ where: { email } });

    if (!result) {
      throw new NotFoundException('Register was not found');
    }

    return result;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prisma[this.model].create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const result = this.prisma[this.model].update({ where: { id }, data });

    if (!result) {
      throw new NotFoundException('Register was not found');
    }

    return result;
  }

  async delete(id: string): Promise<T | null> {
    const result = await this.prisma[this.model].delete({ where: { id } });

    if (!result) {
      throw new NotFoundException('Register was not found');
    }

    return result;
  }
}
