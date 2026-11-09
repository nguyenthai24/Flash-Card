import { UserRole } from '@/common/shares/enums';
import { CreateUserData, UpdateUserData } from '../types/user.types';

export interface UserRecord {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  phone_number?: string;
  avatar?: string;
  date_of_birth?: Date;
  gender?: string;
  point: number;
  role: UserRole;
  headline?: string;
  friendly_id?: number;
}

export interface IUserRepository {
  findById(id: string): Promise<UserRecord | null>;

  findByEmail(email: string): Promise<UserRecord | null>;

  findByUsername(username: string): Promise<UserRecord | null>;

  create(data: CreateUserData): Promise<UserRecord>;

  update(id: string, data: UpdateUserData): Promise<UserRecord | null>;
}
