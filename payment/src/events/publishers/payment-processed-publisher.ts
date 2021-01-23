import { Publisher } from '../base-publisher';
import { PaymentProcessedEvent } from '../payment-processed-event';
import { Subjects } from '../subjects';

export class PaymentProcessedPublisher extends Publisher<PaymentProcessedEvent> {
  subject: Subjects.PaymentProcessed = Subjects.PaymentProcessed;
}
