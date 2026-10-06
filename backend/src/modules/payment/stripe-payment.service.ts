import { Injectable, NotImplementedException } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Injectable()
export class StripePaymentService implements PaymentService {
  processPayment(_orderId: string, _amount: number): Promise<void> {
    throw new NotImplementedException(
      'Stripe payment processing has not been configured yet.',
    );
  }
}
