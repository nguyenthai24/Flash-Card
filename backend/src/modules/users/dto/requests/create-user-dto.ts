import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

import { GENDER } from '@/common/shares/enums';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  first_name: string;

  @IsString()
  @MaxLength(60)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^([+]\d{2})?\d{10}$/)
  phone_number?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @IsEnum(GENDER)
  gender?: GENDER;
}
