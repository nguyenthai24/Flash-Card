import { IsPassword } from '@/common/decorators/validators/is-password.decorator';
import { IsPhoneNumber } from '@/common/decorators/validators/is-phone-number.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email address',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0912345678',
    description: 'User phone number',
  })
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({
    example: 'P@ssw0rd123',
    description: 'User password',
  })
  @IsPassword()
  password: string;

  @ApiProperty({
    example: 'P@ssw0rd123',
    description: 'User re-entered password',
  })
  @IsPassword()
  re_password: string;
}
