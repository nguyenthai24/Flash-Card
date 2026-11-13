import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class EmailDto {
  @IsEmail()
  email: string;
}

export class TokenDto {
  @IsString()
  token: string;
}

export class ResetPasswordDto extends TokenDto {
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  re_password: string;
}
