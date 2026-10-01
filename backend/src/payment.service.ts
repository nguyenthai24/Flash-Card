import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';

interface Payment {
  pay(): void;
}

@Injectable()
export class PaymentService extends AppService {
  private status: string = 'pending';
  constructor(
    appRepository: AppRepository,
    private readonly currency: string,
  ) {
    super(appRepository);

    this.status = `Thanh toán bằng ${currency}`;
  }
  findAll(): string[] {
    return this.appRepository.findAll();
  }

  getPaymentLabel(): string {
    return this.status;
  }
}
