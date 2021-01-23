import { json } from 'body-parser';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import { stan } from './nats-client';
import { PaymentProcessedListener } from './events/listeners/payment-processed-listener'

const app = express();
app.use(json());
app.use(routes);

const start = async () => {
  try {
    stan.on('connect', async () => {
      console.log('Publisher connected to NATS');
      new PaymentProcessedListener(stan).listen();
    });

    await mongoose.connect('mongodb://order-mongo-srv:27017/order', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.error(err);
  }

  app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Listening on port 3000');
  });
};

start();
