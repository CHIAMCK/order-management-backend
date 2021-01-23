import { Subjects } from './subjects';
import { PaymentStatus } from './types/payment-status'

export interface PaymentProcessedEvent {
  subject: Subjects.PaymentProcessed;
  data: {
    status: PaymentStatus;
    orderId: string;
  }
}
