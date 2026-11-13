import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@/modules/users/schemas/user.schemas';
import {
  AuthUserRecord,
  AuthUserUpdate,
  CreateAuthUserData,
  IAuthRepository,
  OAuthAccountRecord,
} from '../interfaces/auth-repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<AuthUserRecord | null> {
    const user = await this.userModel
      .findById(id)
      .select(
        '+password +verification_token_hash +verification_token_expires_at +password_reset_token_hash +password_reset_token_expires_at +refresh_sessions +locked_until',
      )
      .exec();
    return user ? this.toRecord(user) : null;
  }

  async findByEmail(email: string): Promise<AuthUserRecord | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase().trim() })
      .select(
        '+password +verification_token_hash +verification_token_expires_at +password_reset_token_hash +password_reset_token_expires_at +refresh_sessions +locked_until',
      )
      .exec();
    return user ? this.toRecord(user) : null;
  }

  async findByUsername(username: string): Promise<AuthUserRecord | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ? this.toRecord(user) : null;
  }

  async findByOAuthAccount(
    provider: OAuthAccountRecord['provider'],
    providerId: string,
  ): Promise<AuthUserRecord | null> {
    const user = await this.userModel
      .findOne({ oauth_accounts: { $elemMatch: { provider, providerId } } })
      .select('+refresh_sessions')
      .exec();
    return user ? this.toRecord(user) : null;
  }

  async create(data: CreateAuthUserData): Promise<AuthUserRecord> {
    const user = await this.userModel.create(data);
    return this.toRecord(user);
  }

  async update(
    id: string,
    data: AuthUserUpdate,
  ): Promise<AuthUserRecord | null> {
    const user = await this.userModel
      .findById(id)
      .select(
        '+password +verification_token_hash +verification_token_expires_at +password_reset_token_hash +password_reset_token_expires_at +refresh_sessions +locked_until',
      )
      .exec();
    if (!user) return null;

    user.set(data);
    await user.save();
    return this.toRecord(user);
  }

  async consumeVerificationToken(
    hash: string,
    verifiedAt: Date,
  ): Promise<boolean> {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          verification_token_hash: hash,
          verification_token_expires_at: { $gt: verifiedAt },
          email_verified_at: null,
        },
        {
          $set: { email_verified_at: verifiedAt },
          $unset: {
            verification_token_hash: 1,
            verification_token_expires_at: 1,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
    return user !== null;
  }

  async consumePasswordResetToken(
    hash: string,
    password: string,
    consumedAt: Date,
  ): Promise<boolean> {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          password_reset_token_hash: hash,
          password_reset_token_expires_at: { $gt: consumedAt },
        },
        {
          $set: {
            password,
            refresh_sessions: [],
            failed_login_attempts: 0,
            locked_until: null,
          },
          $unset: {
            password_reset_token_hash: 1,
            password_reset_token_expires_at: 1,
          },
          $inc: { token_version: 1 },
        },
        { new: true, runValidators: true },
      )
      .exec();
    return user !== null;
  }

  private toRecord(user: UserDocument): AuthUserRecord {
    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
      email_verified_at: user.email_verified_at,
      verification_token_hash: user.verification_token_hash,
      verification_token_expires_at: user.verification_token_expires_at,
      password_reset_token_hash: user.password_reset_token_hash,
      password_reset_token_expires_at: user.password_reset_token_expires_at,
      refresh_sessions: user.refresh_sessions ?? [],
      failed_login_attempts: user.failed_login_attempts ?? 0,
      locked_until: user.locked_until,
      token_version: user.token_version ?? 0,
      oauth_accounts: user.oauth_accounts ?? [],
    };
  }
}
