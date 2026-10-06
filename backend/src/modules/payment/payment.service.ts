export interface PaymentService {
  processPayment(orderId: string, amount: number): Promise<void>;
}
