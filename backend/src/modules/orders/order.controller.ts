import { Body, Controller, Param, Post } from '@nestjs/common';

import { ProcessPaymentDto } from './dto/process-payment.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':orderId/payment')
  processPayment(
    @Param('orderId') orderId: string,
    @Body() processPaymentDto: ProcessPaymentDto,
  ): Promise<void> {
    return this.orderService.processPayment(orderId, processPaymentDto?.amount);
  }
}
