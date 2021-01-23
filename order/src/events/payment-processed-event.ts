import { Subjects } from './subjects';

export interface PaymentProcessedEvent {
  subject: Subjects.PaymentProcessed;
  data: {
    status: string,
    orderId: string
  };
}
