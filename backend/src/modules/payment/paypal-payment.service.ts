import { Injectable, NotImplementedException } from '@nestjs/common';

import type { PaymentService } from './payment.service';

@Injectable()
export class PaypalPaymentService implements PaymentService {
  processPayment(_orderId: string, _amount: number): Promise<void> {
    throw new NotImplementedException(
      'PayPal payment processing has not been configured yet.',
    );
  }
}
