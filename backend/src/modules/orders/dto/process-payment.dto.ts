import { IsNumber, IsPositive } from 'class-validator';

export class ProcessPaymentDto {
  @IsNumber()
  @IsPositive()
  amount!: number;
}
