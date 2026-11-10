import { UserRole } from '@/common/shares/enums';

export class UserResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number?: string;
  avatar?: string;
  date_of_birth?: Date;
  gender?: string;
  point: number;
  role: UserRole;
  headline?: string;
  friendly_id?: number;
  createdAt: Date;
  updatedAt: Date;
}
