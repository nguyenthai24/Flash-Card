import { Module } from '@nestjs/common';

import { PAYMENT } from './payment.constants';
import { PaypalPaymentService } from './paypal-payment.service';
import { StripePaymentService } from './stripe-payment.service';

@Module({
  providers: [
    StripePaymentService,
    PaypalPaymentService,
    {
      provide: PAYMENT,
      useExisting: PaypalPaymentService,
    },

    {
      provide: 'PAY',
      useExisting: PaypalPaymentService,
    },
  ],
  exports: [PAYMENT, PaypalPaymentService, StripePaymentService],
})
export class PaymentModule {}
