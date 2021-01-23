import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { OrderCreatedEvent } from './order-created-event';
import { Subjects } from './subjects';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {\
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'payments-service';

  onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Event data !!!', data);
    msg.ack();
  }
}
