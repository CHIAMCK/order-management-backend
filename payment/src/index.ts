import { json } from 'body-parser';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import { stan } from './nats-client';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const app = express();
app.use(json());
app.use(routes);

const start = async () => {
  try {
    stan.on('connect', async () => {
      console.log('Publisher connected to NATS');
      new OrderCreatedListener(stan).listen();
    });

    stan.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => stan.close());
    process.on('SIGTERM', () => stan.close());

    await mongoose.connect('mongodb://order-mongo-srv:27017/order', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.error(err);
  }

  app.listen(3001, () => {
    // tslint:disable-next-line: no-console
    console.log('Listening on port 3001');
  });
};

start();
