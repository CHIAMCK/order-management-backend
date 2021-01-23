import { Message } from 'node-nats-streaming';
import { Listener } from '../base-listener';
import { PaymentProcessedEvent } from '../payment-processed-event';
import { Subjects } from '../subjects';
import { Order } from '../../models/order'
import { OrderStatus } from '../types/order-status';

export class PaymentProcessedListener extends Listener<PaymentProcessedEvent> {
  subject: Subjects.PaymentProcessed = Subjects.PaymentProcessed;
  queueGroupName = 'payments-service';

  async onMessage(data: PaymentProcessedEvent['data'], msg: Message) {
    console.log('Event data !!!', data);
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (data.status === 'confirmed') {
      order.set({
        status: OrderStatus.Confirmed
      });

      setTimeout(async () => {
        order.set({
          status: OrderStatus.Delivered
        });
        await order.save();
        console.log('Order is deliverd');
      }, 3000);
    } else {
      order.set({
        status: OrderStatus.Cancelled
      });
    }
    await order.save();

    console.log('order', order);
    msg.ack();
  }
}
