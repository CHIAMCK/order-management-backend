import nats from 'node-nats-streaming';
import { OrderCreatedPublisher } from './events/order-created-publisher';
import { OrderStatus } from './events/types/order-status'

const stan = nats.connect('ordering', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new OrderCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      state: OrderStatus.Created,
      amount: 20,
      customerId: 2,
      createdDate: "2020/01/01",
      updatedDate: "2020/01/01"
    })
  } catch (err) {
    console.error(err);
  }
});
