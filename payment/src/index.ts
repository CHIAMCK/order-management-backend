import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/v1/api/payments/current', (req, res) => {
  res.send('Hi There !!!');
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
