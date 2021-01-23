import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

export const stan = nats.connect('ordering', randomBytes(4).toString('hex'), {
  url: process.env.NATS_URL
});
