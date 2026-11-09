import { GENDER, UserRole } from '@/common/shares/enums';

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  phone_number?: string;
  avatar?: string;
  date_of_birth?: Date;
  gender?: (typeof GENDER)[keyof typeof GENDER];
  role?: UserRole;
  headline?: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar?: string;
  date_of_birth?: Date;
  gender?: (typeof GENDER)[keyof typeof GENDER];
  headline?: string;
}
