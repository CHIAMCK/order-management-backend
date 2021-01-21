import { json } from 'body-parser';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(routes);

const start = async () => {
  try {
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
