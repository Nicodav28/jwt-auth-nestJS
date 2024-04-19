import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/user.dto';
import { hash } from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly usersRepository: UserRepository,
  ) {}

  public async create(userDto: CreateUserDTO) {
    const user = await this.usersRepository.findByEmail(userDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersRepository.create({
      ...userDto,
      password: await hash(userDto.password, 10),
    });
  }

  public async findById(id: number) {
    return await this.usersRepository.findById(id);
  }

  public async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }
}
