import { Message } from 'node-nats-streaming';
import { Listener } from '../base-listener';
import { OrderCreatedEvent } from '../order-created-event';
import { Subjects } from '../subjects';
import { PaymentProcessedPublisher } from '../publishers/payment-processed-publisher';
import { PaymentStatus } from '../types/payment-status';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'order-service';

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Event data !!!', data);

    const paymentStatus = ['Declined', 'Confirmed'];
    const randomStatus = Math.floor(Math.random() * paymentStatus.length);
    const currentPaymentStatus = paymentStatus[randomStatus];

    await new PaymentProcessedPublisher(this.client).publish({
      status: (currentPaymentStatus === 'Confirmed') ? PaymentStatus.Confirmed : PaymentStatus.Declined,
      orderId: data.id
    });

    msg.ack();
  }
}
