import { Inject, Injectable } from '@nestjs/common';

import { PAYMENT } from '../payment/payment.constants';
import type { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(PAYMENT) private readonly paymentService: PaymentService,
    // @Inject('PAY') private readonly paymentService: PaymentService,
  ) {}

  processPayment(orderId: string, amount: number): Promise<void> {
    return this.paymentService.processPayment(orderId, amount);
  }
}
