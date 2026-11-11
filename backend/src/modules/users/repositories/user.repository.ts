import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schemas';
import {
  IUserRepository,
  UserRecord,
} from '../interfaces/user-repository.interface';
import { CreateUserData, UpdateUserData } from '../types/user.types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.userModel.findById(id).exec();

    return user ? this.toRecord(user) : null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    return user ? this.toRecord(user) : null;
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    const user = await this.userModel.findOne({ username }).exec();

    return user ? this.toRecord(user) : null;
  }

  async findAll(): Promise<UserRecord[]> {
    const users = await this.userModel.find().exec();
    console.log(users);
    return users;
  }

  async create(data: CreateUserData): Promise<UserRecord> {
    const user = await this.userModel.create(data);

    return this.toRecord(user);
  }

  async update(id: string, data: UpdateUserData): Promise<UserRecord | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();

    return user ? this.toRecord(user) : null;
  }

  private toRecord(user: UserDocument): UserRecord {
    return {
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      phone_number: user.phone_number,
      avatar: user.avatar,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      point: user.point,
      role: user.role,
      headline: user.headline,
      friendly_id: user.friendly_id,
    };
  }
}
