import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { USER_REPOSITORY } from './constants/user-repository.token';
import { IUserRepository } from './interfaces/user-repository.interface';
import { CreateUserData, UpdateUserData } from './types/user.types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  async create(data: CreateUserData) {
    const existingEmail = await this.userRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.userRepository.findByUsername(
      data.username,
    );

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    return this.userRepository.create(data);
  }

  async update(id: string, data: UpdateUserData) {
    await this.findById(id);

    const user = await this.userRepository.update(id, data);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //   async delete(id: string) {
  //     await this.findById(id);

  //     const deleted = await this.userRepository.delete(id);

  //     if (!deleted) {
  //       throw new NotFoundException('User not found');
  //     }

  //     return { deleted: true };
  //   }
}
